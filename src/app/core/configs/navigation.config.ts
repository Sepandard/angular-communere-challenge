export const NAVIGATION_CONFIG: NavigationConfig[] = [
  {
    title: 'Medicator',
    description: 'Medicator Panel For add and edit item',
    route: 'medication/list',
  }
].sort((a, b) => a.title.localeCompare(b.title));

export interface NavigationConfig {
  title: string;
  description: string;
  route: string;
}
