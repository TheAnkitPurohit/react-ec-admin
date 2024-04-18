import { Typography } from '@mui/material';

import { blackText } from 'src/theme/options/presets';

interface FilterTypes {
  title: string;
}

const FilterLabel = ({ title }: FilterTypes) => (
  <Typography sx={{ mb: 1, color: blackText.secondary, fontSize: 14, fontWeight: 500 }}>
    {title}
  </Typography>
);

export default FilterLabel;
