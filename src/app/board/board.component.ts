import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BoardService } from '../services/board.service';
import { Board, List, Card } from '../models/board.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  addForm!:FormGroup;
  openForm:boolean = false;
  erroe12:boolean = false
  erroe13:boolean = false
  cardObject!:Card;
  cardObject1!:Card;
cardid:any
  board1!:Board;
  isopenfrom:boolean =false

  isModalOpen:boolean = false;
  isshown:boolean=false

  //@Input() board;
  board!:Board;
  titleListEditor: boolean = false;

  editingListId!:number;
  event: any;

  @Input() selectedCard:any;

  @Output() formSubmitEvent: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private boardService:BoardService, private dialog:MatDialog,private fb:FormBuilder) { }

  ngOnInit() {
    this.board = this.boardService.getBoard();
    console.log("board", this.board[1].cards[0]);
    
    this.boardService.getModalState().subscribe((state:any) => {
      console.log(state);
      this.isModalOpen = state.open;
      this.isopenfrom=state.open
      this.cardObject = state.card
    })
    this.addForm = this.fb.group({
      id:[Validators.required],
      title:['', Validators.required],
      content:['', Validators.minLength(25)],
      priority:['',Validators.required]
    });
  }



  deleteCardAction(event:any,listId:number, cardId:number):void {
      event.stopPropagation();
      if(confirm('are you sure ')) {
        this.boardService.deleteCard(listId, cardId);
      }
  }

  drop(event: CdkDragDrop<Card[]>, listIndex:number) {
    // console.log(event);
    console.log('container List: ',event.container);
    console.log('Previous Container List: ',event.previousContainer);
    if (event.previousContainer === event.container) {
      // move Card in the same List
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // move Card in Another List
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }


  addListAction():void {
    let listName = prompt('add data');
    this.boardService.addList(listName);
  }

  editTitleList(list:List):void {
    this.editingListId = list.id;
    this.titleListEditor = true;
  }

  getTitleListOnKeyUp(titleListInput:string, list:List):void {
    list.name = titleListInput;
    this.editingListId = 0;
    this.titleListEditor = false;
  }

  deleteListAction(list:any) {
     this.event.stopPropagation();
      if(confirm('delete the list'+ list.name +' ? ')) {
        this.boardService.deleteList(list.id);
      }
  }


  openModal(card:any) {
    console.log("hello",card);
    this.isModalOpen = true;
    this.cardObject = card;
    console.log(this.boardService.getBoard());
  }

  closeModal() {
    this.isModalOpen = false;
    console.log(this.boardService.getBoard());
  }


  getCardStyle(card:any) {
    let borderStyle;
    let bgcolor;
    switch(card.priority) {
      case 1:
        borderStyle = '3px solid red';
      break;
      case 2:
       borderStyle = '3px solid orange';
      break;
      case 3:
       borderStyle = '3px solid #11ff99';
      break;
    }
    return borderStyle;
  }

  // addevent(listId:number):void{
  //   this.isshown =! this.isshown
  //   let cardTitle = prompt(' create new list');
    
  //   if( cardTitle != null) {
  //     if(cardTitle.trim().length > 0) {
  //       this.boardService.addCard(listId, cardTitle)
  //     }
  //   }
  // }




addformopen(listid:any){
console.log(listid);

this.isopenfrom = true;
this.cardid = listid


}
descriptionerror(){
  if(this.addForm.value.content.length >= 25){
    this.erroe12 = true
  }else{
    this.erroe12 = false
  } 
}
titleerror(){
  if(this.addForm.value.title === ''){
    this.erroe13 = true
  }else{
    this.erroe13 = false
  } 
}

openFormAction() {
  this.openForm = true;
}

closeModal1() {
  this.isopenfrom = false;
  console.log(this.boardService.getBoard());
}

addCardAction(form:any):void {
 
  this.board = this.boardService.getBoard();
  
  let newCard = form.value;
  this.boardService.addCard(newCard,this.board,this.cardid)

  this.formSubmitEvent.emit();
  this.closeModal1()
}



}