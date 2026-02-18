import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';
import { tradingSessionFeature } from './trading-session.reducer';
import { Offer } from '../../models/offers.types';

const selectRouterState: MemoizedSelector<object, RouterReducerState> = createFeatureSelector<RouterReducerState>('router');

const { selectTradingSessionState, selectLoading, selectError } = tradingSessionFeature;

const {selectRouteParam} = getRouterSelectors(selectRouterState);

export const selectRouteSessionId: MemoizedSelector<object, number | null> = createSelector(selectRouteParam('id'), (id: string | undefined): number | null => {
    return typeof id === 'undefined' ? null : +id;
})

export const selectOfferEntities = createSelector(
    selectTradingSessionState,
    state => state?.entities ?? {}
)

export const selectOfferIds = createSelector(
    selectTradingSessionState,
    state => state?.ids ?? []
)

export const selectOffers = createSelector(
    selectOfferIds,
    selectOfferEntities,
    (ids, entities) => ids
        .map(id => entities[id])
        .filter((offer): offer is Offer => offer !== undefined)
);

export const selectSessionLoading = selectLoading;

export const selectSessionError = selectError;
