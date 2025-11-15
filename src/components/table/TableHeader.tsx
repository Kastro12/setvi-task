import { Box, Typography } from '@mui/material';
import type { TableColumn } from './types';

interface Props {
  columns: TableColumn[];
}

const TableHeader = ({ columns }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: 'var(--color-black)',
        borderBottom: '1px solid var(--color-white)',
        padding: '12px 23px 12px 8px',
      }}
    >
      {columns.map((col) => (
        <Box
          key={col.key}
          sx={{
            width: col.width ?? 'auto',
          }}
        >
          <Typography variant='subtitle2' fontWeight={900}>
            {col.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default TableHeader;
