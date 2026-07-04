import { useState } from 'react';
import AutoComplete from '../components/AutoComplete/AutoComplete';

const COUNTRIES = [
  {
    label: 'India',
    value: 'IN',
  },
  {
    label: 'Indian territory',
    value: 'BIT',
  },
  {
    label: 'Indonesia',
    value: 'ID',
  },
  {
    label: 'Australia',
    value: 'AU',
  },
  {
    label: 'Italy',
    value: 'IT',
  },
  {
    label: 'Norway',
    value: 'NO',
  },
  {
    label: 'GERMANY',
    value: 'DU',
  },
  {
    label: 'SPAIN',
    value: 'EN',
  },
  {
    label: 'PORTUGAL',
    value: 'PO',
  },
  {
    label: 'FINLAND',
    value: 'FL',
  },
  {
    label: 'UNITED STATES',
    value: 'US',
  },
  {
    label: 'UNITED KINGDOM',
    value: 'UK',
  },
  {
    label: 'CANADA',
    value: 'CA',
  },
  {
    label: 'MEXICO',
    value: 'MX',
  },
];
export function AutoCompletePage() {
  const [options, setOptions] = useState<typeof COUNTRIES>([]);

  const onSearch = (val: string) => {
    setTimeout(() => {
      setOptions(
        COUNTRIES.filter((item) =>
          item.label.toLowerCase().includes(val.toLowerCase()),
        ),
      );
    }, 100);
  };
  return (
    <>
      <AutoComplete options={options} onSearch={onSearch} />
      auto complete box
    </>
  );
}
