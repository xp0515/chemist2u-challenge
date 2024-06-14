import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, Output, inject } from "@angular/core";

@Component({
    standalone: true,
    imports: [AsyncPipe],
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
    providers: [DatePipe],
})

export class TimerComponent {
    @Input() set duration(value: number) {
        this.maskedDuration = this._datePipe.transform(value * 1000, 'mm:ss') ?? '00:00'
    }
    @Input() isRunning = false;

    @Output() onStartTimer = new EventEmitter();
    @Output() onStopTimer = new EventEmitter();
    @Output() onRemoveTimer = new EventEmitter();

    maskedDuration = '';
    isDisabled = false;

    private _datePipe = inject(DatePipe);

    get imagePath(): string {
        return this.isRunning ? 'assets/pause.png' : 'assets/play.png';
    }

    startOrStopTimer = (): void => {
        if (!this.isDisabled) {
            this.isDisabled = true;
            this.isRunning ? this.onStopTimer.emit() : this.onStartTimer.emit();
            setTimeout(() => {
                this.isDisabled = false;
            }, 2000);
        }
    }

    removeTimer = (): void => this.onRemoveTimer.emit();
}