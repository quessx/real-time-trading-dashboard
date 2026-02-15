import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsMainPage } from './sessions-main-page';

describe('SessionsMainPage', () => {
  let component: SessionsMainPage;
  let fixture: ComponentFixture<SessionsMainPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionsMainPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionsMainPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
