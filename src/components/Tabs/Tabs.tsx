import { KeyboardEvent, useId, useState } from 'react';
import { TabType } from './tabs.types';
import TabPanel from './TabPanel';
import { getTabBtnId, getTabPanelId } from './tab.utils';

type TabsProps = {
  items: TabType[];
};
function Tabs({ items }: TabsProps) {
  const [activeKey, setActiveKey] = useState(items[0].id);

  /**
   * since Tabs component can be re-used, we need identifier for each instance
   */
  const componentId = useId();
  const onTabClick = (key: string) => {
    setActiveKey(key);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLElement>, id: string) => {
    const index = items.findIndex((item) => item.id === id);
    switch (e.key) {
      case 'ArrowRight': {
        const newId = items[(index + 1) % items.length].id;
        const ele = document.getElementById(
          `${getTabBtnId(newId, componentId)}`
        );
        if (ele instanceof HTMLElement) ele.focus();
        setActiveKey(newId);
        break;
      }
      case 'ArrowLeft': {
        const newId = items[(index + items.length - 1) % items.length].id;
        const ele = document.getElementById(
          `${getTabBtnId(newId, componentId)}`
        );
        if (ele instanceof HTMLElement) ele.focus();
        setActiveKey(newId);
        break;
      }
    }
  };
  return (
    <div>
      <div role='tablist'>
        {items.map((itemItem) => {
          return (
            <button
              id={getTabBtnId(itemItem.id, componentId)}
              role='tab'
              onKeyDown={(e) => onKeyDown(e, itemItem.id)}
              tabIndex={activeKey === itemItem.id ? 0 : -1}
              type='button'
              key={itemItem.id}
              aria-controls={getTabPanelId(itemItem.id, componentId)}
              onClick={() => onTabClick(itemItem.id)}
              aria-selected={activeKey === itemItem.id}
            >
              {itemItem.name}
            </button>
          );
        })}
      </div>
      <div>
        {items.map((itemItem) => {
          return (
            <TabPanel
              tabData={itemItem}
              hidden={itemItem.id !== activeKey}
              componentId={componentId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
