import { Controller, useFormContext } from 'react-hook-form';

import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import FilterLabel from 'src/components/CommonTable/filterOption/FilterLabel';

interface AutoSelectFieldProps<T> {
  name: string;
  label: string;
  options: T[];
  style?: any;
  InputSize?: 'small' | 'medium';
  PlaceHolder?: string;
}

const SearchOptionField = <T,>({
  name,
  label,
  options,
  style,
  InputSize,
  PlaceHolder,
}: AutoSelectFieldProps<T>) => {
  const { control } = useFormContext();

  return (
    <Box {...style}>
      {label.length > 0 ? <FilterLabel title={label} /> : ''}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <Autocomplete
            disableClearable
            id="combo-box-demo"
            isOptionEqualToValue={(option: any, values: any) => option.value === values.value}
            options={Array.isArray(options) ? options : []}
            value={value}
            onChange={(_, newValue: any) => onChange(newValue || '')}
            renderInput={(params) => (
              <TextField
                placeholder={PlaceHolder ?? ''}
                {...params}
                size={InputSize ?? 'small'}
                fullWidth
                variant="outlined"
                error={!!error}
                helperText={error ? error.message : ''}
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default SearchOptionField;
