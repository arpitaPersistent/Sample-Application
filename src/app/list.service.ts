import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from './card.service';
import { SessionHelper } from './helper/session-helper';

// import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class ListService {

  private List: Array<any> = [];  // URL to web api


  constructor(private router: Router, private cardService: CardService, private storage: SessionHelper) { }

  /** GET: Get List */

  getList() {
    const list = this.storage.get('list');
    console.log(list, 'getList');
    if (list) {
      this.List = list.split(', ');
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
      return {
        list: listName,
        cards: cardArray ? cardArray : undefined
      };
    });
    console.log(results, 'results');
    return results;
  }

  /** POST: add a new List  */

  addList(name: string, oldVal = '') {
    let item = this.storage.get('list');

    if (item !== '' && item !== null) {
      if (oldVal !== '' && oldVal !== undefined && oldVal !== null) {
        const itemlist = item.split(', ');
        itemlist.forEach((element, i) => {
          if (element === oldVal) {
            itemlist[i] = name;
          }
        });
        item = itemlist.join(', ');
        this.storage.set('list', item);
      } else {
        this.List = item.split(', ');
        if (this.List.length !== 0 ) {
          const same = this.List.some((el) => el === name );
          if (same) { return false; }
        }
        this.List.push(name);
        this.storage.set('list', this.List.join(', '));
      }
    } else {
      this.List.push(name);
      this.storage.set('list', this.List.join(''));
      console.log(this.List.join(''),'utem3');
    }
    this.router.navigateByUrl('');
  }

  /*
  ** Delete list from list array   **
  */

  deleteList(listName: string) {
    const listArr = this.getList();
    const cardArr = this.cardService.getCard();
    if (confirm('Are you sure to delete list '+ listName)) {
      listArr.forEach((el, i) => {
        if (el === listName) {
          listArr.splice(i, 1);
          cardArr.forEach((card, item) => {
            if (card.list === listName) {
              cardArr.splice(item, 1);
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
