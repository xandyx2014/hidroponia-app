import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronosticoPage } from './pronostico.page';

describe('PronosticoPage', () => {
  let component: PronosticoPage;
  let fixture: ComponentFixture<PronosticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronosticoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronosticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
