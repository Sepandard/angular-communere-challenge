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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { ENVIRONMENT_TOKEN } from '../../token';

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
  private readonly environment = inject(ENVIRONMENT_TOKEN, {optional: true});
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
    if(!this.environment) throw Error('Cannot found environment. Add environment in ENVIRONMENT_TOKEN injection token')
    return this.environment.projectName;
  }
}
