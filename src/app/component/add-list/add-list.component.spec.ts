import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListComponent } from './add-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListService } from '../../list.service';
import { CardService } from '../../card.service';
import { SessionHelper } from '../../helper/session-helper';

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListComponent ],
      providers: [ListService, CardService, SessionHelper],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
      expect(component.listForm.valid).toBeFalsy();
  });

  it('name field validity', () => {
      let name = component.listForm.controls['listName'];
      expect(name.valid).toBeFalsy();
  });
});
