import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface AutoCompeteType {
  roles: string[];
  setRoles: any;
  rows?: any;
}

export default function AutoComplete({ roles, setRoles, rows }: AutoCompeteType) {
  const handleChange = (event: SelectChangeEvent<typeof roles>) => {
    const {
      target: { value },
    } = event;
    setRoles(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 200 },
      }}
    >
      <Select
        multiple
        value={roles}
        onChange={handleChange}
        renderValue={(selected) => selected.map((value) => value).join(', ')}
        size="small"
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 240 },
          },
        }}
      >
        {rows &&
          rows.length > 9 &&
          rows.map((name: any) => (
            <MenuItem key={name.categoryName} value={name.categoryName}>
              <Checkbox checked={roles.indexOf(name.categoryName) > -1} />
              <ListItemText primary={name?.categoryName} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}
