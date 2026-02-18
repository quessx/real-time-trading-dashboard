import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from "@angular/common";
import { WebSocketStatus } from '../../models/websocket.types';
import { Observable } from 'rxjs';
import { selectWsStatus } from '../../store/state/trading-session.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-websocket-status',
    imports: [
        AsyncPipe
    ],
  templateUrl: './websocket-status.html',
  styleUrl: './websocket-status.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebsocketStatus {
    store = inject(Store);
    wsStatus$: Observable<WebSocketStatus> = this.store.select(selectWsStatus);
}
