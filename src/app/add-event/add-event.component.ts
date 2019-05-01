import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { EventService } from './../services/event.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
    // newEvent: Events = new Events();
    newEvent: any;
    message: string;
    constructor(
        private eventService: EventService,
        private router: Router,
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    ngOnInit() {
         
    }

    eventsForm = new FormGroup({
        name: new FormControl('', [Validators.required], this.duplicateEventCheck.bind(this) ),
        type: new FormControl('', [Validators.required]),
        length: new FormControl('', [Validators.required, Validators.min(10), Validators.max(1000)]),
    });

    addEvent() {
        if(!this.eventsForm.valid) {
            return false;
        }
        this.eventsForm.value.views = 0;
        this.newEvent = this.eventsForm.value;        
        this.eventService.addEvent({name: this.newEvent.name, type: this.newEvent.type, length: this.newEvent.length, views: 1})
        .subscribe(response => {
            this.messageService.setMessage(3);
            this.router.navigate(['/list-events']);
        }, (err) => {
            this.messageService.setMessage(4);
            this.message = this.messageService.showMessage();           
            //console.log(err)
        }
        );

        /*this.eventService.addEvent(this.newEvent).subscribe((response) => {
      this.router.navigate(['/list-events']);
    });*/
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
    }
}
