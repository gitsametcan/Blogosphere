import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilPageComponent } from './profil-page.component';

describe('ProfilPageComponent', () => {
  let component: ProfilPageComponent;
  let fixture: ComponentFixture<ProfilPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
