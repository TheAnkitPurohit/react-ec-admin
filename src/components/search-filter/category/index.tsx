import { Box } from '@mui/material';

import { config } from 'src/utils/config';

import MainDarkBtn from 'src/components/buttons/MainDarkBtn';
import SearchTextField from 'src/components/search-form/SearchTextField';
import ReactRangePicker from 'src/components/search-form/ReactRangePicker';
import SearchOptionField from 'src/components/search-form/SearchOptionField';
import FilterLabel from 'src/components/CommonTable/filterOption/FilterLabel';

const CategorySearchFilter = () => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'end', flexWrap: 'wrap' }}>
    <SearchTextField name="name" label="Name" style={{ minWidth: 200 }} />
    <SearchTextField name="order" label="Order" type="number" style={{ minWidth: 200 }} />

    <Box sx={{ mt: 2 }}>
      <FilterLabel title="Search by date" />
      <ReactRangePicker name="dateRange" style={{ minWidth: 200 }} />
    </Box>
    <SearchOptionField
      name="enabled"
      label="Status"
      options={config.ACTIVE_STATUS()}
      style={{ minWidth: 170 }}
    />
    <MainDarkBtn name="Search" />
  </Box>
);

export default CategorySearchFilter;
