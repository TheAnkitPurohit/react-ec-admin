import { Typography } from '@mui/material';

import { blackText } from 'src/theme/options/presets';

interface PageTItleTypes {
  name: string;
}

const PageTitle = ({ name }: PageTItleTypes) => (
  <Typography sx={{ color: blackText.primary, fontWeight: 'bold', fontSize: 24, mb: 1.5 }}>
    {name}
  </Typography>
);

export default PageTitle;
