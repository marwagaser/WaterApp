import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admintab2Page } from './admintab2.page';

describe('Admintab2Page', () => {
  let component: Admintab2Page;
  let fixture: ComponentFixture<Admintab2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admintab2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admintab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
