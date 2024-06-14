import { Injectable, inject } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";
import { ServerEvent, TimerPayload } from "../models";

@Injectable({ providedIn: 'root' })

export class SocketService {
    private socket = inject(Socket)

    onEvent(eventName: ServerEvent): Observable<TimerPayload> {
        return this.socket.fromEvent(eventName);
    }

    onTimerEvent(eventName: ServerEvent, data: TimerPayload): void {
        this.socket.emit(eventName, data);
    }
}