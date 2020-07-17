import { TestBed } from '@angular/core/testing';

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
});
