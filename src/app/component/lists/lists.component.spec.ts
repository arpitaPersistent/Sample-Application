import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ListsComponent } from './lists.component';
import { ListService } from '../../list.service';
import { CardService } from '../../card.service';
import { SessionHelper } from '../../helper/session-helper';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsComponent ],
      providers: [ListService, CardService, SessionHelper],
      imports: [
        RouterTestingModule.withRoutes([])
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get function and return true', () => {
    // Arrange
    component.cards = [{cardName: 'test', list: 'test'}];
    component.list = ['test'];

    // Act
    const result = component.showList();

    // Assert
    expect(result).toBe();
});
});
