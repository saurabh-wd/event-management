import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EventService } from './../services/event.service';
import { MessageService } from '../services/message.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  newEvent: any;
  id: any;
  evs: any;
  message: string;

  constructor(private route: ActivatedRoute, private eventService: EventService, private router: Router, private messageService: MessageService) { 
    this.route.params.subscribe(params => this.id = params['id']);
  }
  eventsForm = new FormGroup({
      id: new FormControl('', [Validators.required] ),
      name: new FormControl('', [Validators.required], this.duplicateEventCheck.bind(this) ),
      type: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1000)]),
      views: new FormControl('', [Validators.required])
  });
  ngOnInit() {
    if (this.id) {
      this.eventService.getEventById(this.id).subscribe(response => { this.setupEditData(response); }, (err) => {console.log(err)});
    }
  }

  
  setupEditData(formData: any) {
    this.newEvent = { id: formData._id, name: formData.name, type: formData.type, length: formData.length, views: formData.views };
    this.eventsForm.setValue(this.newEvent);
  }

  updateEvent() {
    console.log(this.eventsForm)
    if(!this.eventsForm.valid) {
            return false;
    }
    this.newEvent = this.eventsForm.value;        
    this.eventService.updateEvents({id: this.newEvent.id, name: this.newEvent.name, type: this.newEvent.type, length: this.newEvent.length, views: this.newEvent.views})
    .subscribe(response => {
        this.messageService.setMessage(1);
        this.router.navigate(['/list-events']);
    }, (err) => {
      this.messageService.setMessage(4);
      this.message = this.messageService.showMessage();
      console.log(err)
      }
    );   
  }

  duplicateEventCheck(control: AbstractControl) {
    
        if(this.eventsForm && !this.eventsForm.dirty) {
            const q1 = new Promise((resolve, reject) => {
                resolve(null);
            });
            return q1;
        } else if(this.eventsForm) {
           const matchingControl = this.eventsForm.controls['name'];   
          const q = new Promise((resolve, reject) => {
            setTimeout(() => {             
             // matchingControl.setErrors({ 'duplicateName': true });
                             /////matchingControl.setErrors({ 'duplicateName': false });                            
                  //resolve({ 'duplicateName': true });
                  resolve(null)    
              this.eventService.checkDuplicate(control.value, this.eventsForm.value.id).subscribe((response) => {                 
                if(response.data.count > 0){ 
                  matchingControl.setErrors({ 'duplicateName': true });
                  resolve({ 'duplicateName': true });
                } else {resolve(null)}
              });
            }, 1000);
          });
          return q;
        }    
    };

}
