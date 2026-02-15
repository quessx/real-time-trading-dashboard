import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'session/:id',
        loadComponent: () =>
            import('./pages/trading-session-page/trading-session-page')
                .then(m => m.TradingSessionPage)
    },
    {
        path: 'sessions',
        loadComponent: () =>
            import('./pages/sessions-main-page/sessions-main-page')
                .then(m => m.SessionsMainPage)
    },
    {path: '', redirectTo: 'sessions', pathMatch: 'full'}
];
