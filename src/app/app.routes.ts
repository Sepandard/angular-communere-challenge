import { Routes } from '@angular/router';
import { LayoutComponent } from '@app/core';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        {
            path: '',
            loadComponent: () =>
              import('./feature/preview/preview.component').then(
                (c) => c.PreviewComponent,
              ),
       },
      {
        path: 'medication/list',
        loadComponent: () =>
          import('./feature/medication/components/medication-list/medication-list.component').then(
            (c) => c.MedicationListComponent,
          ),
      },
    ],
  },
];
