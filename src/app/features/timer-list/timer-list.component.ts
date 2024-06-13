import { NgFor } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { randomInteger } from "../../shared/helpers/helper";
import { SocketService } from "../../shared/services/socket.service";
import { ServerEvent } from "../../shared/models";

@Component({
    standalone: true,
    imports: [NgFor, ReactiveFormsModule],
    selector: `timer-list`,
    templateUrl: `./timer-list.component.html`
})

export class TimerListComponent implements OnInit {
    private _socketService = inject(SocketService)

    timersArray: FormGroup<{
        id: FormControl<number | null>;
        duration: FormControl<number | null>;
    }>[] = []

    ngOnInit(): void {
        this._socketService.onEvent(ServerEvent.SERVEREVENT).subscribe(({ id, duration }) => {
            const timerFormGroup = this.timersArray.find(timerFormGroup => timerFormGroup.controls.id.value === id)
            if (!!timerFormGroup) {
                timerFormGroup.patchValue({ duration })
            } else {
                this.timersArray.push(new FormGroup({
                    id: new FormControl(id),
                    duration: new FormControl(duration),
                }))
            }
        });
    }

    addTimer = (): void => {
        const id = new Date().valueOf();
        const duration = randomInteger(600, 1200)
        this.timersArray.push(new FormGroup({
            id: new FormControl(id),
            duration: new FormControl(duration),
        }));
        this._socketService.onTimerEvent(ServerEvent.ADDTIMER, { id, duration })
    }

    removeTimer = (timer: FormGroup, index: number): void => {
        this.timersArray.splice(index, 1)
        this._socketService.onTimerEvent(ServerEvent.REMOVETIMER, { duration: timer.value.duration, id: timer.value.id })
    }

    startTimer = (timer: FormGroup): void => {
        this._socketService.onTimerEvent(ServerEvent.STARTTIMER, { duration: timer.value.duration, id: timer.value.id })
    }

    stopTimer = (timer: FormGroup): void => {
        this._socketService.onTimerEvent(ServerEvent.STOPTIMER, { duration: timer.value.duration, id: timer.value.id })
    }
}