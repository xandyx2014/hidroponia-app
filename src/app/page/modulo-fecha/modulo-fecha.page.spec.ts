import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloFechaPage } from './modulo-fecha.page';

describe('ModuloFechaPage', () => {
  let component: ModuloFechaPage;
  let fixture: ComponentFixture<ModuloFechaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuloFechaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuloFechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
