import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css']
})
export class CardModalComponent implements OnInit {

  @Input() selectedCard:any;
  @Output() formSubmitEvent: EventEmitter<Object> = new EventEmitter<Object>();

  cardForm!:FormGroup;
  openForm:boolean = false;
  erroe12:boolean = false
  erroe13:boolean = false
  

  constructor(private fb:FormBuilder, private boardService:BoardService) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      id: this.selectedCard.id,
      title:[this.selectedCard.title, Validators.required],
      content:[ this.selectedCard.content, Validators.minLength(5)],
      priority: this.selectedCard.priority
    });
  }
  
  updateCardAction(form:any) {
    
    console.log(form.value);
    console.log(form.valid);
    let newCard = form.value;
    newCard.priority = parseInt(newCard.priority);
    let board =  this.boardService.getBoard();
    let listIndex;
    let cardIndex;
    
    for(let [i,list] of board.entries()) {
      for(let [j,card] of list.cards.entries()) {
        if(board[i].cards[j].id  == form.value.id) {
           listIndex = i;
           cardIndex = j
        }
      }
    }
    console.log( listIndex);
    console.log( cardIndex);

     this.boardService.updateCard(listIndex, cardIndex, newCard);
     this.formSubmitEvent.emit();
  }

  openFormAction() {
    this.openForm = true;
  }

  closeFormAction() {
    this.openForm = false;
  }
  
  descriptionerror(){
    console.log("this.cardForm",this.cardForm.value.content);
    if(this.cardForm.value.content.length >= 25){
      this.erroe12 = true
    }else{
      this.erroe12 = false
    } 
  }
  
  titleerror(){
    if(this.cardForm.value.title === ''){
      this.erroe13 = true
    }else{
      this.erroe13 = false
    } 
  }
}