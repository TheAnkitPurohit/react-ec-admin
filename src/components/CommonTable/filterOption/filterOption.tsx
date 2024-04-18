import { useState, useCallback } from 'react';

import { Box } from '@mui/material';

import FilterLabel from './FilterLabel';
import AutoComplete from './AutoComplete';
import TextInputField from './TextInputField';
import MainDarkBtn from '../../buttons/MainDarkBtn';

type IOrderTableFilters = {
  name: string;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

type IOrderTableFilterValue = string | Date | null;

const FilterOption = () => {
  const [roles, setRoles] = useState<string[]>([]);
  const defaultFilters: IOrderTableFilters = {
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  };
  const [filters, setFilters] = useState(defaultFilters);

  const handleFilters = useCallback((name: string, value: IOrderTableFilterValue) => {
    // table.onResetPage();
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const canReset =
    !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  return (
    <Box
      sx={{
        mb: 2,
        p: '16px',
        position: 'relative',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        background: 'white',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <FilterLabel title="Progress" />
          <AutoComplete roles={roles} setRoles={setRoles} />
        </Box>
        <Box>
          <FilterLabel title="Customer" />
          <TextInputField name="" />
        </Box>
        <Box>
          <FilterLabel title="Search" />
          <TextInputField name="" />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end' }}>
          <MainDarkBtn name="Search" handleClick={() => {}} />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <FilterLabel title="Search" />
        {/* <RangePicker
          filters={filters}
          onFilters={handleFilters}
          canReset={canReset}
          onResetFilters={handleResetFilters}
        /> */}
      </Box>
    </Box>
  );
};

export default FilterOption;
