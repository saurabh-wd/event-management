import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  constructor() { }
  private messageText: string;
  private messageClass: string;
  private messageArr: Object = 
  {
    1:  {text: 'Records updated successfully', class: 'alert-success'},
    2:  {text: 'Error in saving data', class: 'alert-danger'},
    3:  {text: 'Records added successfully', class: 'alert-success'},
    4:  {text: 'Error in saving data', class: 'alert-danger'},    
    5:  {text: 'Record deleted successfully', class: 'alert-success'},
    6:  {text: 'Failed to  deleted ', class: 'alert-danger'}
  }
  setMessage(typeId:number) {
    this.messageText = this.messageArr[typeId].text;
    this.messageClass = this.messageArr[typeId].class;
  }
  // getMessage() {
  //   let messageText = this.messageText;
  //   this.messageText = '';
  //   return messageText;
  // }
  showMessage() {
    let messageText   = this.messageText;
    let messageClass = this.messageClass;
    this.messageText = '';
    this.messageClass = '';
    if(messageText) {
      return `<ul class="messageText"><li><div class="alert ${messageClass}">${messageText}</div></li></ul>`;
      //return `<div class="alert ${messageClass}">${messageText}</div>`
    } {
      return '';
    }
  }
  
}
