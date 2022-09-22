import { Component } from '@angular/core';
import { BoardService } from './services/board.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trellBorad';

  board:any;


  constructor(private boardService:BoardService) {}
  
  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

}
