import { Component, output } from "@angular/core";

@Component({
    standalone: true,
    imports: [],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})

export class HeaderComponent {
    onAddTimer = output<void>();
    onSortAsc = output<void>();
    onSortDesc = output<void>();

    sortAsc = (): void => this.onSortAsc.emit();

    sortDesc = (): void => this.onSortDesc.emit();

    addTimer = (): void => this.onAddTimer.emit();
}