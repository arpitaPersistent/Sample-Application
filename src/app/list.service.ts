import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from './card.service';
import { SessionHelper } from './helper/session-helper';

// import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ListService {

  List: Array<any> = [];  // URL to web api


  constructor(private router: Router, private cardService: CardService, private storage: SessionHelper) { }

  /** GET: Get List */

  getList() {
    const list = this.storage.get('list');
    if (list) {
      this.List = list.split(', '); // get list array
    }
    return this.List;
  }

  /*
  ** Get all list with all the Cards   **
  */
  getListWithCards() {
    const cards = this.cardService.getCard();
    const list = this.getList();

    const results = list.map(listName => {
      const cardArray = [];
      if (cards !== undefined) {
        cards.forEach(el => {
          if (el.list === listName) {
            cardArray.push(el);
          }
        });
      }
      return { // create object for lists and cards
        list: listName,
        cards: cardArray ? cardArray : undefined
      };
    });
    return results;
  }

  /** POST: add a new List  */

  addList(name: string, oldVal = '') {
    let item = this.storage.get('list');

    if (item !== '' && item !== null) { // checking stored list data not null
      if (oldVal !== '' && oldVal !== undefined && oldVal !== null) { // check oldName if not null then update
        const itemlist = item.split(', '); // converting string into array
        itemlist.forEach((element, i) => {
          if (element === oldVal) {
            itemlist[i] = name; // update new name for the list
          }
        });
        item = itemlist.join(', ');
        this.storage.set('list', item);
      } else {  // if oldName is null then insert
        this.List = item.split(', ');
        if (this.List.length !== 0 ) {
          const same = this.List.some((el) => el === name );
          if (same) { return false; }
        }
        this.List.push(name);
        this.storage.set('list', this.List.join(', '));
      }
    } else { // insert if no data found
      this.List.push(name);
      this.storage.set('list', this.List.join(''));
    }
    this.router.navigateByUrl('');
  }

  /*
  ** Delete list from list array   **
  */

  deleteList(listName: string) {
    const listArr = this.getList();
    const cardArr = this.cardService.getCard();
    if (confirm('Are you sure to delete list ' + listName)) {
      listArr.forEach((el, i) => {
        if (el === listName) {
          listArr.splice(i, 1); // delete list if matched
          cardArr.forEach((card, item) => {
            if (card.list === listName) {
              cardArr.splice(item, 1); // delete card in the list
              this.storage.setByStringify('card', cardArr);
            }
          });
          this.storage.set('list', listArr.join(', '));
        }
      });
      return true;
    }
  }
}
