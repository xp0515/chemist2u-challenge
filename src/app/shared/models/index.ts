export type TimerPayload = {
    id: number;
    duration: number;
}

export enum ServerEvent {
    ADDTIMER = 'addTimer',
    STARTTIMER = 'startTimer',
    STOPTIMER = 'stopTimer,',
    REMOVETIMER = 'removeTimer',
    SERVEREVENT = 'serverEvent'
}

export type Timer = {
    id: number;
    duration: number;
    callback: unknown;
}