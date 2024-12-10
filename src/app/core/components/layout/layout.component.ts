import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Optional,
  SkipSelf,
} from '@angular/core';
import { ResponsiveLayoutService } from '../../services';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { NAVIGATION_CONFIG, NavigationConfig } from '../../configs/navigation.config';
import { ENVIRONMENT } from 'src/app/environments/environments';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    AsyncPipe,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
  ],
})
export class LayoutComponent {
  public readonly responsiveService = inject(ResponsiveLayoutService);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly parentInstance = inject(LayoutComponent, { optional: true, skipSelf: true });
  public navList = NAVIGATION_CONFIG;

  constructor() {
    if (this.parentInstance) {
      throw new Error(
        'SingleInstanceComponent is already instantiated. Only one instance of this component is allowed.',
      );
    }
  }

  onChangeRoute(item: NavigationConfig) {
    this.title.setTitle(item.title);

    this.router.navigate([item.route]);
  }

  getProjectName() {
    return ENVIRONMENT.projectName;
  }
}
