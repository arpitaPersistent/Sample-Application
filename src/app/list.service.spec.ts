import { TestBed, inject } from '@angular/core/testing';

import { ListService } from './list.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CardService } from './card.service';
import { SessionHelper } from './helper/session-helper';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ListService, CardService, SessionHelper],
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a list', inject([SessionHelper], (storage: SessionHelper) => {
    storage.removeItem('list');
    const list = 'test';
    service.addList(list);
    expect(service.List).toEqual(['test']);
    storage.removeItem('list');
  }));

  it('should update list properly', inject([SessionHelper], (storage: SessionHelper) => {
    const list = 'test';
    service.addList(list);
    service.addList('test123', 'test');
    const List = service.getList();
    expect(List).toEqual(['test123']);
    expect(List.length).toEqual(1);
    storage.removeItem('list');
  }));

  it('checking data that contain list with all the cards', inject([SessionHelper], (storage: SessionHelper) => {
    const list = 'test';
    service.addList(list);
    const listArr = service.getListWithCards();
    expect(listArr).toEqual([{list: 'test', cards: Array(0)}]);
    storage.removeItem('list');
  }));

  it('checking get-list and delete-list functionality', () => {
    const list = 'test';
    service.addList(list);
    const listArr = service.getList();
    service.deleteList(listArr[0]);
    expect(service.List).toEqual([]);
  });

});
