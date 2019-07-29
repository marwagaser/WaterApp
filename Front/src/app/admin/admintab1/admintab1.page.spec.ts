import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Admintab1Page } from './admintab1.page';

describe('Admintab1Page', () => {
  let component: Admintab1Page;
  let fixture: ComponentFixture<Admintab1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Admintab1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Admintab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
