import { Injectable } from '@angular/core';
import { data } from '../models/data';
import { Board, Card } from '../models/board.model';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()

export class BoardService {

  constructor() { }

  private data:Board = data;
private Card:Board=data;
  
  private priorityCards$ = new BehaviorSubject<Card[]>(this.initializePriorityCards());
  private modalState$ = new Subject();

 
  getBoard():Board {
    return this.data;
  }


  addCard(listId:any, cardTitle:any,id:any):void {
   console.log("listId",cardTitle);
   
  
    let list:any = this.data.find(list => list.id == id);
    console.log("leeeeeee",list.id );
    list.cards = [ {id:listId.id,title:listId.title, content:listId.content, priority:3}, ...list.cards ];    
    this.setPriorityCards();
  }

 
  deleteCard(listId:any, cardId:any):void {
    let list:any = this.data.find(list => list.id == listId);
    console.log(list);
    let card:any = list.cards.find((card: { id: any; }) => card.id == cardId);
    console.log(card);
    let index = list.cards.indexOf(card);
    list.cards.splice(index, 1);
    this.setPriorityCards();
  }


  updateCard(listIndex:any, cardIndex:any, newCard:any):void {
   this.data[listIndex].cards[cardIndex] = newCard;
   this.setPriorityCards();
  }

  addList(listName:any):void {
    this.data.push({'id':Date.now(), 'name': listName , 'cards':[]});
  }

  deleteList(listId:any):void {
    let list:any = this.data.find(list => list.id == listId);
    let index = this.data.indexOf(list);
    this.data.splice(index, 1);
    this.setPriorityCards();
  }

  
  initializePriorityCards():Card[] {
    let cards = [];
    for(let list of this.data){
      for(let card of list.cards) {
        if(card.priority === 1) {
          cards.push(card)
        }
      }
    }
    return cards;
  }

  setPriorityCards():void {
    let cards:Card[] = [];
    for(let list of this.data){
      for(let card of list.cards) {
        if(card.priority === 1) {
          cards.push(card);
        }
      }
    }
    this.priorityCards$.next(cards);
  }

  getPriorityCards() {
    return this.priorityCards$;
  }

 
  setModalState(bool:boolean, card:Card):void {
    let state = {
      open: bool,
      card: card
    }
    this.modalState$.next(state)
  }


  getModalState() {
    return this.modalState$;
  }


}