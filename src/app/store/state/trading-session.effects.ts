import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, filter, map, Observable, of, switchMap, withLatestFrom } from 'rxjs';
import { TradingSessionApi } from '../../services/trading-session-api';
import { TradingSessionActions } from './trading-session.actions';
import { Offer } from '../../models/offers.types';
import { HttpErrorResponse } from '@angular/common/http';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Action, Store } from '@ngrx/store';
import { selectRouteSessionId } from './trading-session.selectors';
import { WebsocketService } from '../../services/websocket.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { SocketEvent, WebSocketStatus } from '../../models/websocket.types';

type TSocketEvent =
    | { offer: Offer } & Action<"[Trading Session] offerCreated">
    | { offer: Offer } & Action<"[Trading Session] offerUpdated">
    | { id: number } & Action<"[Trading Session] offerDeleted">;

@Injectable()
export class TradingSessionEffects {
    private actions$ = inject(Actions);
    private tradingSessionApiService: TradingSessionApi = inject(TradingSessionApi);
    private store = inject(Store);
    private websocketService: WebsocketService = inject(WebsocketService);

    syncRouteEnterSession$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(selectRouteSessionId)),
            map(([, sessionId]: [object, number | null]) => {
                if (sessionId === null) {
                    return TradingSessionActions.leaveSession();
                }
                return TradingSessionActions.connectSession({sessionId});
            })
        )
    })

    loadOffers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TradingSessionActions.connectSession),

            switchMap(({sessionId}: { sessionId: number }) => {
                return this.tradingSessionApiService.getSessions(sessionId).pipe(
                    map((offers: Offer[]) =>
                        TradingSessionActions.loadOffers({offers})
                    ),
                    catchError((error: HttpErrorResponse) =>
                        of(TradingSessionActions.loadOffersFail({error}))
                    )
                )
            })
        )
    });

    wsConnecting$ = createEffect((): Observable<void> =>
            this.actions$.pipe(
                ofType(TradingSessionActions.connectSession),
                map((): void =>
                    this.websocketService.start()
                )
            ),
        {dispatch: false}
    )

    socketEvents$ = createEffect(() =>
        toObservable(this.websocketService.eventSocket).pipe(
            filter((socketEvent: SocketEvent | null): socketEvent is SocketEvent => !!socketEvent),
            switchMap((event: SocketEvent): Observable<TSocketEvent> => {
                switch (event.type) {
                    case "OFFER_CREATED":
                        return of(TradingSessionActions.offerCreated({offer: event.payload}));
                    case "OFFER_UPDATED":
                        return of(TradingSessionActions.offerUpdated({offer: event.payload}));
                    case "OFFER_DELETED":
                        return of(TradingSessionActions.offerDeleted({id: event.payload.id}));
                    default:
                        return EMPTY;
                }
            })
        )
    );

    wsStatusChanged$ = createEffect(() =>
        toObservable(this.websocketService.status).pipe(
            map((status: WebSocketStatus) => TradingSessionActions.wsChanged({status}))
        )
    )
}
