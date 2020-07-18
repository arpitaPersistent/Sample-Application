import { TestBed, inject } from '@angular/core/testing';

import { CardService } from './card.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionHelper } from './helper/session-helper';
import { ListService } from './list.service';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ListService, CardService, SessionHelper],
    });
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check for addind a card', inject([SessionHelper], (storage: SessionHelper) => {
    storage.removeItem('card');
    const cardItem = {cardName: 'test', list: 'test'};
    service.addCard(cardItem);
    expect(service.Card).toEqual([cardItem]);
    storage.removeItem('card');
  }));

  it('checking get-card and update-card functionality', inject([SessionHelper], (storage: SessionHelper) => {
    const cardItem = {cardName: 'test', list: 'test'};
    service.addCard(cardItem);
    service.addCard({cardName: 'test123', list: 'test'}, cardItem.cardName);
    expect(service.Card).toEqual([{cardName: 'test123', list: 'test'}]);
    expect(service.Card.length).toEqual(1);
    storage.removeItem('card');
  }));
  it('checking get-card and delete-card functionality', () => {
    const cardItem = {cardName: 'test', list: 'test'};
    service.addCard(cardItem);
    const card = service.getCard();
    service.deleteCard(card[0].cardName);
    expect(service.Card).toEqual([]);
  });

});
