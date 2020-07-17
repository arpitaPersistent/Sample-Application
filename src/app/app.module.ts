import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListsComponent } from './component/lists/lists.component';
import { AddListComponent } from './component/add-list/add-list.component';
import { AddCardComponent } from './component/add-card/add-card.component';
import { ListService } from './list.service';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardService } from './card.service';
import { SessionHelper } from './helper/session-helper';

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    AddListComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    FormsModule
  ],
  providers: [ListService, SessionHelper, CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
