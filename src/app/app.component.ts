import { Component } from '@angular/core';
import { TimerListComponent } from './features/timer-list/timer-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chemist2u-challenge';
}
