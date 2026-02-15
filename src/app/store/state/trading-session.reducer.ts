import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Offer } from '../../models/offers.types';
import { HttpErrorResponse } from '@angular/common/http';
import { createFeature, createReducer, on } from '@ngrx/store';
import { TradingSessionActions } from './trading-session.actions';

export interface TradingSessionState extends EntityState<Offer> {
    loading: boolean;
    error: HttpErrorResponse | null;
    websocketStatus: 'Online' | 'Offline';
}

export const tradingSessionAdapter: EntityAdapter<Offer> = createEntityAdapter<Offer>();

const initialState: TradingSessionState = tradingSessionAdapter.getInitialState({
    loading: false,
    error: null,
    websocketStatus: 'Offline'
});

export const tradingSessionReducer = createReducer(
    initialState,

    on(TradingSessionActions.loadOffers, (state, {offers}) =>
        tradingSessionAdapter.setAll(offers, {...state, loading: false})
    ),
    on(TradingSessionActions.loadOffersFail, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
);

export const tradingSessionFeature = createFeature({
    name: 'tradingSession',
    reducer: tradingSessionReducer
})
