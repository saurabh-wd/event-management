import { Injectable } from '@angular/core';
import { Events } from './../model/event';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  lastId = 0;

  events: Events[] = [];

  constructor(private apiService: ApiService) { }

  // Add an event
  addEvent(event: Events): any {
    return this.apiService.post(environment.BASE_HREF, event);
  }

  // Get all events
  getEvents(postObj: any): any {
    return this.apiService.post(environment.BASE_HREF+'list', postObj);
  }

  // Get event by ID
  getEventById(id: number): any {
    return this.apiService.get(environment.BASE_HREF+id);   
  }

  updateEvents(event: Events): any {
    let eventData: any = event; 
    let _id = eventData.id;
    delete eventData.id;
    //eventData.push({_id: _id});
    eventData._id = _id;

    return this.apiService.put(environment.BASE_HREF, eventData);
    //return this.http.put(environment.BASE_HREF, eventData, { headers: { 'Content-type': 'application/json' });
  }
  deleteEvent(event): any {
    return this.apiService.delete(environment.BASE_HREF, event);
  }

  checkDuplicate(name: string, id?:number): any {
    return this.apiService.post(environment.BASE_HREF+'check-duplicate', {name:name, id:id});
  }
}
