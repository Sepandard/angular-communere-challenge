import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVIGATION_CONFIG, ResponsiveLayoutService } from '@app/core';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [NgClass,RouterLink, AsyncPipe, NgFor],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  readonly configs = NAVIGATION_CONFIG;
  public responsiveService = inject(ResponsiveLayoutService)
  ngOnInit(): void {}

}
