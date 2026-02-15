import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class WebsocketService {
    private connectedSessionId: number | null = null;
    private socket: WebSocket | null = null;
    private readonly websocketBaseUrl = 'ws://localhost:5160/ws/offers';

    private store: Store = inject(Store);

    public start(sessionId: number): void {
        const isSameSession: boolean = this.connectedSessionId === sessionId;
        const isConnectingOrOpen =
            this.socket?.readyState === WebSocket.CONNECTING || this.socket?.readyState === WebSocket.OPEN;

        if (isSameSession && isConnectingOrOpen) {
            return;
        }

        this.connectedSessionId = sessionId;
        this.openConnection();
    }

    private openConnection(): void {
        if (this.connectedSessionId === null) {
            return;
        }
        let socket: WebSocket;

        try {
            socket = new WebSocket(`${this.websocketBaseUrl}?sessionId=${this.connectedSessionId}`);
        } catch {
            console.log('status offline');
            //todo try reconect
            console.log('reconnect');
            return;
        }

        socket.onopen = () => {
            return;
        }

    }
}
