import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <main className='grid-layout h-full'>
      <Sidebar />
      <div
       className='flex justify-center items-center'
      >
        <div className='h-200 w-200'>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default Layout;
