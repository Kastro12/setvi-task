import { List } from 'react-window';
import type { RowComponentProps } from 'react-window';
import TableHeader from './TableHeader';
import LoaderRow from './LoaderRow';
import type { TableProps, TableColumn, TableColumnType } from './types';
import { Box, Typography } from '@mui/material';
import { useCallback } from 'react';

interface ColumnProps {
  type: TableColumnType;
  value: string | number;
}

const Column = ({ type, value }: ColumnProps) => {
  switch (type) {
    case 'paragraph':
      return <Typography variant='body1'>{value}</Typography>;

    case 'image':
      if (typeof value === 'string') {
        return <img style={{ height: '100%', objectFit: 'contain' }} src={value} />;
      } else return value;

    default:
      return value;
  }
};

const Table = <T extends Record<string, any>>({
  columns,
  data,
  hasNextPage,
  isLoading,
  isFetchingNextPage,
  onLoadMore,
  rowHeight,
  overscanCount,
  style,
}: TableProps<T>) => {
  const rowCount = data.length + (hasNextPage ? 1 : 0);

  const Row = useCallback(
    ({ index, style }: RowComponentProps) => {
      const isLoaderRow = index === data.length;

      if (isLoaderRow) {
        return (
          <Box
            style={style}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <LoaderRow />
          </Box>
        );
      }

      const row = data[index];

      return (
        <Box
          style={style}
          sx={{
            display: 'flex',
            borderBottom: '1px solid var(--color-white)',
            alignItems: 'center',
            padding: '0 8px',
            boxSizing: 'border-box',
          }}
        >
          {columns.map((col: TableColumn) => (
            <Box
              key={col.key}
              sx={{ width: col.width, height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Column type={col.fieldType} value={row[col.key]} />
            </Box>
          ))}
        </Box>
      );
    },
    [columns, data]
  );

  return (
    <Box sx={{ border: '1px solid var(--color-white)', borderRadius: 1, overflow: 'hidden' }}>
      <TableHeader columns={columns} />
      <List
        rowHeight={rowHeight}
        rowCount={rowCount}
        rowComponent={Row}
        rowProps={{}}
        overscanCount={overscanCount}
        style={style}
        onRowsRendered={({ stopIndex }) => {
          const lastDataRow = data.length;
          const isLoaderVisible = stopIndex >= lastDataRow;
          if (isLoaderVisible && hasNextPage && !(isLoading || isFetchingNextPage)) {
            onLoadMore();
          }
        }}
      />

      {isLoading && (
        <Box
          style={style}
          sx={{
            height: `${rowHeight}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LoaderRow />
        </Box>
      )}
    </Box>
  );
};
export default Table;
