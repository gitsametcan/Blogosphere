import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardsComponent } from './list-cards.component';

describe('ListCardsComponent', () => {
  let component: ListCardsComponent;
  let fixture: ComponentFixture<ListCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
