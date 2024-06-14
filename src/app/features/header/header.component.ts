import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    standalone: true,
    imports: [],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
    @Output() onAddTimer = new EventEmitter();
    @Output() onSortAsc = new EventEmitter();
    @Output() onSortDesc = new EventEmitter();

    sortAsc = (): void => this.onSortAsc.emit();

    sortDesc = (): void => this.onSortDesc.emit();

    addTimer = (): void => this.onAddTimer.emit();
}