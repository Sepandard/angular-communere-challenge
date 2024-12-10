import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent, ENVIRONMENT_TOKEN } from '@app/core';
import { ENVIRONMENT } from './environments/environments';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: ENVIRONMENT, 
    },
  ],
})
export class AppComponent {
}
