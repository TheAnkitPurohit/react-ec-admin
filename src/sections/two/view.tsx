import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------
const AnyReactComponent = (text: any) => <div>{text}</div>;

export default function TwoView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ position: 'relative' }}>
      <Typography variant="h4"> Page Two </Typography>

      <Box
        sx={{
          mt: 5,
          width: 1,
          padding: '10px',
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      ></Box>
    </Container>
  );
}
