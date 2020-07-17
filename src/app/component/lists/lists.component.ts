import { Component, OnInit } from '@angular/core';
import { ListService } from '../../list.service'
import { CardService } from '../../card.service';


@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  list: any;
  cards: any;
  listArray: Array<any> = [];
  listCount: number;
  constructor(private listService: ListService, private cardService: CardService) { }

  ngOnInit(): void {
    this.showList();
  }

  /*
  **  Show list with cards   **
  */
  public showList() {
    this.listArray = this.listService.getListWithCards();
  }

  /*
  **  delete List  **
  */
  public deleteList(list: string) {
    const res = this.listService.deleteList(list);
    if (res) {
      this.showList();
    }
  }

  /*
  **  delete Card  **
  */
  public deleteCard(card: string) {
    const res = this.cardService.deleteCard(card);
    if (res) {
      this.showList();
    }
  }
}
