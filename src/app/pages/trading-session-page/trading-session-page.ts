import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { selectOffers } from '../../store/state/trading-session.selectors';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Offer } from '../../models/offers.types';
import { OffersTable } from '../../ui/offers-table/offers-table';
import { WebsocketStatus } from '../../ui/websocket-status/websocket-status';

@Component({
  selector: 'app-trading-session-page',
    imports: [
        AsyncPipe,
        OffersTable,
        WebsocketStatus
    ],
  templateUrl: './trading-session-page.html',
  styleUrl: './trading-session-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradingSessionPage {
    store = inject(Store);
    offers$: Observable<Offer[]> = this.store.select(selectOffers);
}
