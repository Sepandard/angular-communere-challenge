import { InjectionToken } from '@angular/core';

export const ENVIRONMENT_TOKEN = new InjectionToken<{ projectName: string }>('EnvironmentToken');
