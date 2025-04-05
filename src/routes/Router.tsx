import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeList } from './routeList';
import Layout from '../Layout/Layout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routeList.map((routeItem) => (
            <Route
              element={<routeItem.component />}
              key={routeItem.name}
              path={routeItem.path}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
