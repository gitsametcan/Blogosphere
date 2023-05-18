import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompomentDenemeComponent } from './compoment-deneme.component';

describe('CompomentDenemeComponent', () => {
  let component: CompomentDenemeComponent;
  let fixture: ComponentFixture<CompomentDenemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompomentDenemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompomentDenemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
