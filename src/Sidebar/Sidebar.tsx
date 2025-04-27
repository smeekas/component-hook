import { Link } from 'react-router-dom';
import { routeList } from '../routes/routeList';

function Sidebar() {
  return (
    <aside className='bg-blue-200 p-2'>
      <ul className='list-none p-0'>
        {routeList.map((routeItem) => {
          return (
            <li
              className='hover:bg-blue-700 hover:text-white bg-blue-50 transition  cursor-pointer'
              key={routeItem.name}
            >
              <Link
                className='w-full block text-gray-800 no-underline hover:text-white hover:underline py-3'
                to={routeItem.path}
              >
                <span className='pl-3'>
                {routeItem.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
