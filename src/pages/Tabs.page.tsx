import Tabs from '../components/Tabs/Tabs';
import { TabType } from '../components/Tabs/tabs.types';

export function TabsPage() {
  const items: TabType[] = [
    {
      id: 'profile',
      name: <p>profile</p>,
      component: (
        <>
          <h2>profile tab</h2>
        </>
      ),
    },
    {
      id: 'settings',
      name: <p>settings</p>,
      component: (
        <>
          <h2>Settings</h2>
        </>
      ),
    },
  ];
  return <Tabs items={items} />;
}
