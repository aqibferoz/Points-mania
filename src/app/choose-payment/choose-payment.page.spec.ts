import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePaymentPage } from './choose-payment.page';

describe('ChoosePaymentPage', () => {
  let component: ChoosePaymentPage;
  let fixture: ComponentFixture<ChoosePaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoosePaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
