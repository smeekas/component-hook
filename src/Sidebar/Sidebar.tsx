import { Link } from 'react-router-dom';
import { routeList } from '../routes/routeList';

function Sidebar() {
  return (
    <aside className='bg-blue-200 p-2'>
      <ul>
        {routeList.map((routeItem) => {
          return (
            <li
              className='hover:bg-blue-700 hover:text-white bg-blue-50 transition p-2 cursor-pointer'
              key={routeItem.name}
            >
              <Link className='w-full block' to={routeItem.path}>
                {routeItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default Sidebar;
