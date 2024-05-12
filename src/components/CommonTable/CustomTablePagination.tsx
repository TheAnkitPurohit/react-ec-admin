import * as React from 'react';

import {
  Box,
  Menu,
  List,
  MenuItem,
  Typography,
  Pagination,
  ListItemText,
  ListItemButton,
} from '@mui/material';

interface CustomTablePaginationProps {
  paginationPerPage: number;
  handlePaginationPerPageChange: (perPage: number) => void;
  page: number;
  handlePageChange: (page: number) => void;
  rowCount: number;
  totalPages: number;
}

const CustomTablePagination = ({
  paginationPerPage,
  page,
  handlePaginationPerPageChange,
  handlePageChange,
  rowCount,
  totalPages,
}: CustomTablePaginationProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (handlePaginationPerPageChange && index !== paginationPerPage)
      handlePaginationPerPageChange(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = [5, 10, 25, 50, 100];

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    handlePageChange(value);
  };

  return (
    <>
      {rowCount > 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Typography variant="body2">Rows per page:</Typography>

          <div>
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
              <ListItemButton
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
              >
                <ListItemText primary={paginationPerPage} />
              </ListItemButton>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === paginationPerPage}
                  onClick={(event) => handleMenuItemClick(event, option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>

          <Typography variant="body2">
            {(page - 1) * paginationPerPage + 1}–{paginationPerPage * page} of {rowCount}
          </Typography>

          <Pagination
            count={totalPages}
            showFirstButton
            showLastButton
            defaultPage={page}
            onChange={handleChange}
          />
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
export default CustomTablePagination;
