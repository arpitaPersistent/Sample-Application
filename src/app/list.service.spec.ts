import { TestBed } from '@angular/core/testing';

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
});
