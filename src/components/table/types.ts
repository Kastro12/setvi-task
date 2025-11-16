import type { ReactNode } from 'react';

export type TableColumnType = 'paragraph' | 'image';

export type TableColumn = {
  key: string;
  fieldType: TableColumnType;
  label: string;
  width?: string;
};

export type RowRenderer<T> = (item: T) => ReactNode;

export interface TableProps<T extends Record<string, any>> {
  columns: TableColumn[];
  data: T[];
  hasNextPage: boolean;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  rowHeight: number;
  overscanCount: number;
  style?: React.CSSProperties;
}
