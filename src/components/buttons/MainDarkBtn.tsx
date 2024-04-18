import { Button } from '@mui/material';

import { cyan } from 'src/theme/options/presets';

import Iconify from 'src/components/iconify';

interface MiniFilterTypes {
  name: string;
  handleClick?: any;
  iconName?: any;
  extraStyle?: any;
  isSubmitting?: boolean;
}

const MainDarkBtn = ({
  name,
  handleClick,
  iconName,
  extraStyle,
  isSubmitting,
}: MiniFilterTypes) => (
  <Button
    type="submit"
    disabled={isSubmitting}
    sx={{
      textTransform: 'capitalize',
      background: cyan.lightBg,
      color: 'white',
      transition: '0.4s all',
      px: 2,
      ':hover': {
        background: cyan.lightBg,
        color: 'white',
        opacity: 0.8,
      },
      ...extraStyle,
    }}
    onClick={() => handleClick && handleClick()}
    startIcon={<Iconify icon={iconName} />}
  >
    {name}
  </Button>
);

export default MainDarkBtn;
