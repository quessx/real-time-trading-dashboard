import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../models/offers.types';

@Injectable({
  providedIn: 'root',
})
export class TradingSessionApi {
    private readonly http: HttpClient = inject(HttpClient);
    private readonly host: string = 'http://localhost:5000/'
    private readonly baseUrl: string = 'api/trading-sessions';

    public getSessions(sessionId: number): Observable<Offer[]> {
        return this.http.get<Offer[]>(`${this.host}${this.baseUrl}/${sessionId}`);
    }
}
