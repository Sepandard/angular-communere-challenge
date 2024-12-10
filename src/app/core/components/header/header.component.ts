import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  inject,
  Output,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule],
})
export class HeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  public readonly title = inject(Title);
  public readonly titleSignal = signal(this.title.getTitle());
  public readonly titleComputed = computed(() => this.titleSignal() ?? 'Medication Tracker');

  
}
