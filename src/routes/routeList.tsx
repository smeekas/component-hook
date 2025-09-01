import GridLightsPage from '../pages/GridLights.page';
import { NestedChekboxesPage } from '../pages/NestedCheckboxes.page';
import { SelectableGridPage } from '../pages/SelectableGrid.page';
import { TabsPage } from '../pages/Tabs.page';

export const routeList = [
  {
    name: 'Home',
    path: '/',
    component: () => <h1>home</h1>,
  },
  {
    name: 'Grid Light',
    path: '/grid-light',
    component: GridLightsPage,
  },
  {
    name: 'Selectable Grid',
    path: '/selectable-grid',
    component: SelectableGridPage,
  },
  {
    name: 'Nested Chechboxes',
    path: '/nested-checkboxes',
    component: NestedChekboxesPage,
  },
  {
    name: 'Tabs',
    path: '/tabs',
    component: TabsPage,
  },
];
