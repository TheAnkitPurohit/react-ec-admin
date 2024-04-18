import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

import { cyan } from 'src/theme/options/presets';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  defaultSearchValues: CategorySearchFilterInterface;
  totalResults: number;
  values: CategorySearchFilterInterface;
  handleResetFilters: () => void;
  handleRemove: (name: 'name' | 'enabled' | '_id' | 'order') => void;
};

export default function CategoryFilterResult({
  defaultSearchValues,
  totalResults,
  values,
  handleResetFilters,
  handleRemove,
  ...other
}: Props) {
  return (
    <Stack spacing={1.5} {...other} sx={{ mt: 1.8 }}>
      <Box sx={{ typography: 'body2' }}>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          &nbsp; Results Found
        </Box>
        &nbsp;
        <strong>{totalResults}</strong>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {values?.name !== defaultSearchValues?.name && (
          <Block label="Search">
            <Chip
              label={values?.name}
              size="small"
              onDelete={() => {
                handleRemove('name');
              }}
              sx={{
                background: cyan.main,
                '&:hover': {
                  background: cyan.dark,
                  color: 'white',
                },
              }}
            />
          </Block>
        )}
        {/* 
        {values?.status?.label !== defaultSearchValues?.status?.label && (
          <Block label="Status">
            <Chip
              label={values?.status?.label}
              size="small"
              onDelete={() => {
                handleRemove('status');
              }}
              sx={{
                background: cyan.main,
                '&:hover': {
                  background: cyan.dark,
                  color: 'white',
                },
              }}
            />
          </Block>
        )} */}

        <Button
          color="error"
          onClick={handleResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
