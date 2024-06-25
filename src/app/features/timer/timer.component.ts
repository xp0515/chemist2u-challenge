import { AsyncPipe, DatePipe } from "@angular/common";
import { Component, inject, output, input, computed } from "@angular/core";

@Component({
    standalone: true,
    imports: [AsyncPipe],
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.scss'],
    providers: [DatePipe],
})

export class TimerComponent {
    duration = input<number>(0);
    isRunning = input<boolean>(false);

    onStartTimer = output<void>();
    onStopTimer = output<void>();
    onRemoveTimer = output<void>();

    maskedDuration = computed(() => this._datePipe.transform(this.duration() * 1000, 'mm:ss') ?? '00:00')
    isDisabled = false;

    private _datePipe = inject(DatePipe);

    get imagePath(): string {
        return this.isRunning() ? 'assets/pause.png' : 'assets/play.png';
    }

    startOrStopTimer = (): void => {
        if (!this.isDisabled) {
            this.isDisabled = true;
            this.isRunning() ? this.onStopTimer.emit() : this.onStartTimer.emit();
            setTimeout(() => {
                this.isDisabled = false;
            }, 2000);
        }
    }

    removeTimer = (): void => this.onRemoveTimer.emit();
}