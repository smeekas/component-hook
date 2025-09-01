import { getTabBtnId, getTabPanelId } from './tab.utils';
import { TabType } from './tabs.types';

type TabPanelProps = { tabData: TabType; hidden: boolean; componentId: string };
function TabPanel({ tabData, hidden, componentId }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      className={`${hidden && 'hidden'}`}
      // label of current tabpanel is given by current tab button
      aria-labelledby={getTabBtnId(tabData.id, componentId)}
      id={getTabPanelId(tabData.id, componentId)}
    >
      {tabData.component}
    </div>
  );
}

export default TabPanel;
