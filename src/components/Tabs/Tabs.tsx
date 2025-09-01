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
        // find next tab (circular)
        const newId = items[(index + 1) % items.length].id;
        const ele = document.getElementById(
          `${getTabBtnId(newId, componentId)}`
        );
        // focus on new tab button
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
      // support of home, esc, up/down arrow can be given
    }
  };
  return (
    <div>
      <div role='tablist'>
        {items.map((itemItem) => {
          return (
            <button
              onKeyDown={(e) => onKeyDown(e, itemItem.id)}
              id={getTabBtnId(itemItem.id, componentId)}
              // button is acting like tab button
              role='tab'
              // only active tab is focusable, rest can be navigated via arrows
              tabIndex={activeKey === itemItem.id ? 0 : -1}
              // which panel current button controls
              aria-controls={getTabPanelId(itemItem.id, componentId)}
              // for sr, if current tab is selected or not
              aria-selected={activeKey === itemItem.id}
              type='button'
              key={itemItem.id}
              onClick={() => onTabClick(itemItem.id)}
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
