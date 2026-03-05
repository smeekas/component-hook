import Virtualized from '../components/Virtualized/Virtualized';
import '../styles/virtual.css';
export function VirtualizedListPage() {
  const arr = Array.from({ length: 100 }).map(
    (item, index) => `${item} ${index}`,
  );
  return (
    <div className='card'>
      <Virtualized list={arr} size={120} overScan={0}>
        {({ index }) => {
          return `item-${index}`;
        }}
      </Virtualized>
    </div>
  );
}
