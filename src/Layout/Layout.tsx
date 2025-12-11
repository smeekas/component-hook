import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <main className='grid-layout h-full'>
      <Sidebar />
      <div className='flex justify-center items-center'>
        <div>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Layout;
