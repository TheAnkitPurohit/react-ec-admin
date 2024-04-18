import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import FilterLabel from 'src/components/CommonTable/filterOption/FilterLabel';

type Props = TextFieldProps & {
  name: string;
  label: string;
  style: any;
};
const SearchTextField = ({ name, label, type, style }: Props) => {
  const { control } = useFormContext();

  return (
    <Box {...style}>
      <FilterLabel title={label} />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            size="small"
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            fullWidth
            variant="outlined"
          />
        )}
      />
    </Box>
  );
};

export default SearchTextField;
