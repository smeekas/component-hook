import GridLightsPage from '../pages/GridLights.page';

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
];
