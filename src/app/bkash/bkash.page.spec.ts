import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BkashPage } from './bkash.page';

describe('BkashPage', () => {
  let component: BkashPage;
  let fixture: ComponentFixture<BkashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BkashPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BkashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
