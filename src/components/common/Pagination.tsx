import React, { FC } from 'react';
import MuiPagination, { PaginationProps } from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const Pagination: FC<PaginationProps & { pageNo: number }> = (props) => {
  const { pageNo } = props;

  return (
    <Stack spacing={3}>
      <Typography>Page: {pageNo}</Typography>
      <MuiPagination {...props} />
    </Stack>
  );
};
