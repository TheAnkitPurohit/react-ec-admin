import React from 'react';

import { Typography } from '@mui/material';

import { blackText } from 'src/theme/options/presets';

interface MainHeadingProps {
  heading: string;
}

const MainHeading = ({ heading }: MainHeadingProps) => (
  <Typography sx={{ color: blackText.primary, fontWeight: 'bold', fontSize: 24 }}>
    {heading}
  </Typography>
);

export default MainHeading;
