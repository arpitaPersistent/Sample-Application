import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionHelper } from './helper/session-helper';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  Card = [];

  constructor(private router: Router, private storage: SessionHelper) { }

  /*
  ** Get ALl The Cards   **
  */
  getCard(): Array<any> {
    const item = this.storage.get('card');
    if (item !== null && item !== '') {
      this.Card = JSON.parse(item); //// get card array
    }
    return this.Card;
  }

  /*
  ** Add Cards to the list   **
  */
  addCard(cardItem: any, oldName: string = '') {
    const item = this.storage.get('card');
    if (item !== null && item !== '' && item !== null) {
      this.Card = JSON.parse(item);
      if (this.Card.length > 0) { 
        const same = this.Card.some((el) => el.cardName === cardItem.cardName );
        if (same) { return false; } // check for duplicate name
      }
      if (oldName) {
        this.Card.forEach((el, i) => {
          if (el.cardName === oldName) {
            this.Card[i] = cardItem;
          }
        });
      } else {
        this.Card.push(cardItem); // add new card
      }
    } else {
      this.Card.push(cardItem); // add new card
    }
    this.storage.setByStringify('card', this.Card);
    this.router.navigateByUrl('');
  }

  /*
  ** delete Card from the list   **
  */
  deleteCard(cardName: string) {
    const cardArr = this.getCard();
    if (confirm('Are you sure to delete list ' + cardName)) {
      cardArr.forEach((el, item) => {
        if (el.cardName === cardName) {
          cardArr.splice(item, 1); // remove card
          this.storage.setByStringify('card', cardArr);
        }
      });
    }
    return true;
  }
}
