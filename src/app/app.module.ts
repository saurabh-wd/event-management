import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routingModule } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MessageService } from './services/message.service';

import { AppComponent } from './app.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    ListEventsComponent,
    UpdateEventComponent,
    ModalComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    routingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
