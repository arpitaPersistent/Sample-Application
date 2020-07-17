import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddListComponent } from './component/add-list/add-list.component';
import { ListsComponent } from './component/lists/lists.component';
import { AddCardComponent } from './component/add-card/add-card.component';


const routes: Routes = [
  {
      path: '',
      component: ListsComponent,
  },
  {
    path: 'add-list',
    component: AddListComponent,
  },
  {
    path: 'add-list/:list',
    component: AddListComponent,
  },
  {
    path: 'add-card',
    component: AddCardComponent,
  },
  {
    path: 'add-card/:cardName',
    component: AddCardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
