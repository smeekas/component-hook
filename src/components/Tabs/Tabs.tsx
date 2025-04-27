import { useState } from 'react';
import { TabType } from './tabs.types';
import TabPanel from './TabPanel';

type TabsProps = {
  items: TabType[];
};
function Tabs({ items }: TabsProps) {
  const [activeKey, setActiveKey] = useState(items[0].id);
  return (
    <div>
      <div>
        {items.map((itemItem) => {
          return (
            <button
              className=' '
              tabIndex={activeKey === itemItem.id ? 0 : -1}
              key={itemItem.id}
            >
              {itemItem.name}
            </button>
          );
        })}
      </div>
      <div>
        {items.map((itemItem) => {
          return (
            <TabPanel tabData={itemItem} hidden={itemItem.id !== activeKey} />
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
