import React from 'react';
import { TabType } from './tabs.types';

type TabPanelProps = { tabData: TabType; hidden: boolean };
function TabPanel({ tabData, hidden }: TabPanelProps) {
  return (
    <div className={`${hidden && 'hidden'}`} key={tabData.id}>
      {tabData.component}
    </div>
  );
}

export default TabPanel;
