import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaycardsPage } from './playcards.page';

describe('PlaycardsPage', () => {
  let component: PlaycardsPage;
  let fixture: ComponentFixture<PlaycardsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaycardsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaycardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
