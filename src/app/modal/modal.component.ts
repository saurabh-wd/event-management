import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }
  @Input() showModal: boolean = false;
  @Output('modalClose') modalClose = new EventEmitter <boolean>();
  ngOnInit() {
  }

  closeModal(e) {
    e.preventDefault();
    this.showModal = false;
    this.modalClose.emit(true);
  }
}
