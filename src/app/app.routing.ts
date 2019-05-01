import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AddEventComponent } from './add-event/add-event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';

const routes: Routes = [
  { path: '',  redirectTo: '/list-events', pathMatch: 'full' },
  { path: 'list-events', component: ListEventsComponent },
  { path: 'add-events', component: AddEventComponent },
  { path: 'update-event/:id', component: UpdateEventComponent }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);