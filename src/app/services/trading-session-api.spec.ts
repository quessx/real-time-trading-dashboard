import { TestBed } from '@angular/core/testing';

import { TradingSessionApi } from './trading-session-api';

describe('TradingSessionApi', () => {
  let service: TradingSessionApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingSessionApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
