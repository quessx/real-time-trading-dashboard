import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsocketStatus } from './websocket-status';

describe('WebsocketStatus', () => {
  let component: WebsocketStatus;
  let fixture: ComponentFixture<WebsocketStatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsocketStatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsocketStatus);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
