import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Offer } from '../../models/offers.types';
import { HttpErrorResponse } from '@angular/common/http';

export const TradingSessionActions = createActionGroup({
    source: 'Trading Session',
    events: {
        connectSession: props<{ sessionId: number }>(),
        leaveSession: emptyProps(),
        loadOffers: props<{ offers: Offer[] }>(),
        loadOffersFail: props<{ error: HttpErrorResponse }>(),
        offerCreated: props<{ offer: Offer }>(),
        offerUpdated: props<{ offer: Offer }>(),
        offerDeleted: props<{ id: number }>(),
    },
});
