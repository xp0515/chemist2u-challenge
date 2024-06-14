import { NgFor } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { randomInteger } from "../../shared/helpers/helper";
import { ServerEvent } from "../../shared/models";
import { SocketService } from "../../shared/services/socket.service";
import { TimerComponent } from "../timer/timer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    standalone: true,
    imports: [NgFor, HeaderComponent, ReactiveFormsModule, TimerComponent],
    selector: `timer-list`,
    styleUrls: ['./timer-list.component.scss'],
    templateUrl: `./timer-list.component.html`
})

export class TimerListComponent implements OnInit {
    timers: FormGroup<{
        id: FormControl<number>;
        duration: FormControl<number>;
        isRunning: FormControl<boolean>;
    }>[] = []

    private _socketService = inject(SocketService)

    ngOnInit(): void {
        this._socketService.onEvent(ServerEvent.SERVEREVENT).subscribe(({ id, duration, isRunning }) => {
            const timerFormGroup = this.timers.find(timerFormGroup => timerFormGroup.controls.id.value === id)
            if (!!timerFormGroup) {
                timerFormGroup.patchValue({ duration, isRunning })
            } else {
                this.timers.push(new FormGroup({
                    id: new FormControl(id, { nonNullable: true }),
                    duration: new FormControl(duration, { nonNullable: true }),
                    isRunning: new FormControl(isRunning ?? false, { nonNullable: true }),
                }))
            }
            if (duration === 0 && isRunning) {
                this.stopTimer(timerFormGroup as FormGroup);
            }
        });
    }

    addTimer = (): void => {
        const id = new Date().valueOf();
        const duration = randomInteger(600, 1200)
        this.timers.push(new FormGroup({
            id: new FormControl(id, { nonNullable: true }),
            duration: new FormControl(duration, { nonNullable: true }),
            isRunning: new FormControl(false, { nonNullable: true }),
        }));
        this._socketService.onTimerEvent(ServerEvent.ADDTIMER, { id, duration })
    }

    removeTimer = (timer: FormGroup, index: number): void => {
        this.timers.splice(index, 1)
        this._socketService.onTimerEvent(ServerEvent.REMOVETIMER, { duration: timer.value.duration, id: timer.value.id })
    }

    startTimer = (timer: FormGroup): void => {
        const duration = timer.value.duration === 0 ? randomInteger(600, 1200) : timer.value.duration
        this._socketService.onTimerEvent(ServerEvent.STARTTIMER, { duration, id: timer.value.id });
    }

    stopTimer = (timer: FormGroup): void => this._socketService.onTimerEvent(ServerEvent.STOPTIMER, { duration: timer.value.duration, id: timer.value.id });

    getDuration = (timer: FormGroup): number => timer.value.duration;

    isRunning = (timer: FormGroup): boolean => timer.value.isRunning;

    sortAsc = () => {
        if (!this.timers.length) {
            return
        }
        this.timers.sort((a, b) => (a.value.duration ?? 0) - (b.value.duration ?? 0))
    }

    sortDesc = () => {
        if (!this.timers.length) {
            return
        }
        this.timers.sort((a, b) => (b.value.duration ?? 0) - (a.value.duration ?? 0))
    }
}