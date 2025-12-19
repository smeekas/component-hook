import GridLightsPage from '../pages/GridLights.page';
import { NestedChekboxesPage } from '../pages/NestedCheckboxes.page';
import { NumberAnimationPage } from '../pages/NumberAnimation.page';
import { SelectableGridPage } from '../pages/SelectableGrid.page';
import { TabsPage } from '../pages/Tabs.page';
import { SlotNumberAnimationPage } from '../pages/SlotNumberAnimation.page';
import { TooltipPage } from '../pages/Tooltip.page';
import { TrafficLightPage } from '../pages/TrafficLight.page';

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
  {
    name: 'Vanilla Tooltip',
    path: '/tooltip',
    component: TooltipPage,
  },
  {
    name: 'Number Animation',
    path: '/number-animation',
    component: NumberAnimationPage,
  },
  {
    name: 'Slot Number Animation',
    path: '/slot-number-animation',
    component: SlotNumberAnimationPage,
  },
  {
    name: 'Traffic Light',
    path: '/traffic-light',
    component: TrafficLightPage,
  },
];
