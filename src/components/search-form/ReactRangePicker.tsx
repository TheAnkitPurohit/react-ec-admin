import 'dayjs/locale/ja';
import 'rsuite/Button/styles/index.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';

type Props = {
  name: string;
  style?: any;
};

// Manually define Japanese locale for DatePicker

export default function ReactRangePicker({ name, style }: Props) {
  const { control } = useFormContext();

  return (
    <Box {...style}>
      <Controller
        name={name}
        control={control}
        defaultValue={undefined}
        render={({ field: { onChange, value } }) => (
          <DateRangePicker
            value={value}
            ranges={[]}
            cleanable
            showOneCalendar
            placement="bottom"
            format="yyyy/MM/dd"
            character=" へ "
            onChange={onChange}
            showHeader={false}
            placeholder="yyyy/mm/dd ~ yyyy/mm/dd"
          />
        )}
      />
    </Box>
  );
}
