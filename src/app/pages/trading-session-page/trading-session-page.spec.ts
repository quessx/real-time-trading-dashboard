import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingSessionPage } from './trading-session-page';

describe('TradingSessionPage', () => {
  let component: TradingSessionPage;
  let fixture: ComponentFixture<TradingSessionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingSessionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingSessionPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
