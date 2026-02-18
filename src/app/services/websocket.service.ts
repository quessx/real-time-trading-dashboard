import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { SocketEvent, WebSocketStatus } from '../models/websocket.types';

@Injectable({
    providedIn: 'root',
})
export class WebsocketService {
    private socket: WebSocket | null = null;
    private readonly websocketBaseUrl = 'ws://localhost:5000/ws/offers';

    public status: WritableSignal<WebSocketStatus> = signal('offline');
    public eventSocket: WritableSignal<SocketEvent | null> = signal(null);
    private store: Store = inject(Store);

    public start(): void {
        const isConnectingOrOpen =
            this.socket?.readyState === WebSocket.CONNECTING || this.socket?.readyState === WebSocket.OPEN;

        if (isConnectingOrOpen) {
            return;
        }

        this.openConnection();
    }

    private openConnection(): void {
        let socket: WebSocket;

        try {
            socket = new WebSocket(`${this.websocketBaseUrl}`);
        } catch {
            this.status.update((): WebSocketStatus => 'offline');
            //todo try reconect
            return;
        }

        this.socket = socket;

        socket.onopen = () => {
            if (socket !== this.socket) {
                return;
            }

            this.status.update(() => 'online');
        }

        socket.onmessage = (event: MessageEvent<string>) => {
            if (socket !== this.socket) {
                return;
            }

            let socketEvent: SocketEvent | null = null;

            try {
                socketEvent = this.parseSocketEvent(event.data);
            } catch {
                console.error('event.data', event.data);
            }

            if (!socketEvent) {
                return;
            }

            this.eventSocket.set(socketEvent);
        }

        socket.onerror = () => {
            if (socket !== this.socket) {
                return;
            }

            this.status.update(() => 'offline');
        }

        socket.onclose = () => {
            if (socket !== this.socket) {
                return;
            }

            this.socket = null;
            this.status.update(() => 'offline');
        };
    }

    private parseSocketEvent(data: string): SocketEvent | null {
        let socketEvent: SocketEvent;

        try {
            socketEvent = JSON.parse(data);
        } catch {
            return null;
        }


        if (typeof socketEvent['payload'] !== 'object') {
            return null;
        }

        return socketEvent;
    }
}
