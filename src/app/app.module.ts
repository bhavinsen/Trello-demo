import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { CardModalComponent } from './card-modal/card-modal.component';
import { BoardService } from './services/board.service';
import { BoardComponent } from './board/board.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule, DragDropModule, AppRoutingModule,MatDialogModule,BrowserAnimationsModule],
  declarations: [ AppComponent, CardModalComponent, BoardComponent, NavbarComponent ],
  bootstrap:    [ AppComponent ],
  providers: [BoardService]
})
export class AppModule { }
