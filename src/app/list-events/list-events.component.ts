import { Component, OnInit } from '@angular/core';
import { EventService } from './../services/event.service';
import { Events } from './../model/event';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {

  events: Array<Events> = [];
  selectedCheckboxIds: Array<number> = [];
  deleteModalShow: boolean = false;
  deleteMessage: string;
  currentView: string = 'list';
  eventTypes: Array<Object> = [];
  message: string = '';

  totalRecords: number = 0;
  recordPerPage: number = 1;
  pageNo: number = 1;

  sortCol: string = 'name';
  sortType: string = 'asc';

  constructor(private eventService: EventService, private messageService: MessageService) {
    this.eventTypes = [
      { id: 1, name: 'Type1' },
      { id: 2, name: 'Type2' },
      { id: 3, name: 'Type3' },
      { id: 4, name: 'Type4' }
    ];
  }

  ngOnInit() {
    this.message = this.messageService.showMessage();
    this.loadData();
  }
  loadData() {
    this.eventService.getEvents({ pageNo: this.pageNo, recordPerPage: this.recordPerPage, sortCol: this.sortCol, sortType: this.sortType }).subscribe((response) => {
      this.events = response.data;
      this.totalRecords = response.summary.total;
    })
  }
  doPaginate(pageNum: number) {
    this.pageNo = pageNum;
    this.loadData();
  }
  switchView() {
    this.currentView = this.currentView == 'list' ? 'grid' : 'list';
  }
  getEventType(typeId: number) {
    let typeName = '';
    for (let type of this.eventTypes) {
      if (type['id'] == typeId) {
        typeName = type['name'];
        break
      }
    }
    return typeName;
  }




  deleteOne(event: any) {
    this.deleteMessage = `Are you sure you want to delete the event <strong>${event.name}</strong>`;
    this.selectedCheckboxIds = [];
    this.selectedCheckboxIds.push(event['_id']);
    this.deleteModalShow = true;

  }
  bulkDelete() {
    this.deleteMessage = `Are you sure you want to delete all the selected event(s)`;
    this.deleteModalShow = true;


  }
  selectCheckbox(id: number, e) {
    if (e.target.checked) {
      this.selectedCheckboxIds.push(id);
    } else {
      (this.selectedCheckboxIds).splice((this.selectedCheckboxIds).indexOf(id), 1);
    }
  }
  deleteStart() {
    this.message = '';
    this.eventService.deleteEvent(this.selectedCheckboxIds).subscribe((response) => {
      this.deleteModalShow = false;
      this.selectedCheckboxIds = [];
      this.messageService.setMessage(5);
      this.message = this.messageService.showMessage();
      this.loadData();
    }, (err) => {
      this.messageService.setMessage(6);
      this.message = this.messageService.showMessage();
      console.log(err)
    }
    )
  }

  checkAll(e) {
    if (e.target.checked) {
      for (let event of this.events) {
        this.selectedCheckboxIds.push(event['_id']);
        event['checked'] = true;
      }
    } else {
      for (let event of this.events) {
        this.selectedCheckboxIds = [];
        event['checked'] = false;
      }
    }
  }
  deleteConfirm() {
    this.deleteStart();
  }
  deleteCancel(event: any) {
    this.deleteModalShow = false;
  }

  sortColumn(col: string) {
    this.sortCol = col;
    this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
    this.loadData();
  }


}
