import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { TradingSessionApi } from '../../services/trading-session-api';
import { TradingSessionActions } from './trading-session.actions';
import { Offer } from '../../models/offers.types';
import { HttpErrorResponse } from '@angular/common/http';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import { selectRouteSessionId } from './trading-session.selectors';

@Injectable()
export class TradingSessionEffects {
    private actions$ = inject(Actions);
    private tradingSessionApiService: TradingSessionApi = inject(TradingSessionApi);
    private store = inject(Store);

    syncRouteEnterSession$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ROUTER_NAVIGATED),
            withLatestFrom(this.store.select(selectRouteSessionId)),
            map(([, sessionId]: [object, number | null]) => {
                console.log(sessionId);
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
}
