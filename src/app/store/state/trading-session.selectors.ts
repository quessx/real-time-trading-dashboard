import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { getRouterSelectors, RouterReducerState } from '@ngrx/router-store';

const selectRouterState: MemoizedSelector<object, RouterReducerState> = createFeatureSelector<RouterReducerState>('router');

const {selectRouteParam} = getRouterSelectors(selectRouterState);

export const selectRouteSessionId: MemoizedSelector<object, number | null> = createSelector(selectRouteParam('id'), (id: string | undefined): number | null => {
    return typeof id === 'undefined' ? null : +id;
})
