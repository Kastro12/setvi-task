import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import type { CategoryListResponse } from '../../types/categories';
import { CircularProgress } from '@mui/material';

interface SelectFieldProps {
  error: Error | null;
  isLoading: boolean;
  label?: string;
  data?: CategoryListResponse[] | undefined;
  selectedValue: string;
  handleChange: (event: SelectChangeEvent<string>) => void;
  handleClear: () => void;
}

const SelectField = ({
  error,
  isLoading,
  label,
  data,
  selectedValue,
  handleChange,
  handleClear,
}: SelectFieldProps) => {
  return (
    <FormControl sx={formControlStyles}>
      <InputLabel id='multiple-chip-label'>
        {error
          ? error?.message
            ? `${label}: ${error?.message}`
            : `${label}: Something went wrong. Try again later.`
          : label}
      </InputLabel>
      <Select
        sx={selectStyles}
        disabled={isLoading || error ? true : false}
        labelId='multiple-chip-label'
        id='multiple-chip'
        value={selectedValue}
        onChange={handleChange}
        input={<OutlinedInput id='select-multiple-chip' label='Show by category' />}
        MenuProps={{
          disableScrollLock: true,
          variant: 'menu',
          PaperProps: {
            sx: paperPropsStyles,
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
        }}
        renderValue={(selected) => {
          const value = data ? data.find((d: CategoryListResponse) => d.slug === selected) : null;
          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='body1' sx={{ color: 'var(--color-white)' }}>
                  {value?.name}
                </Typography>
              </Box>
            </Box>
          );
        }}
      >
        {data &&
          data.map((item: CategoryListResponse) => (
            <MenuItem key={item.slug} value={item.slug} sx={menuItemStyles}>
              {item.name}
            </MenuItem>
          ))}
      </Select>

      {isLoading && <CircularProgress size={32} sx={iconButtonStyles} />}

      {selectedValue && (
        <IconButton onClick={handleClear} size='small' sx={iconButtonStyles}>
          <ClearIcon fontSize='small' />
        </IconButton>
      )}
    </FormControl>
  );
};

export default SelectField;

const formControlStyles = {
  position: 'relative',
  width: '100%',
  borderRadius: '4px',
  label: {
    lineHeight: '18px',
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '0 6px',
    '&.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.7)',
    },
  },
};

const selectStyles = {
  backgroundColor: 'var(--color-black)',
  color: 'var(--color-white)',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-white)',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-white)',
    boxShadow: '0 0 12px rgba(255, 255, 255, 0.5)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-green)',
    boxShadow: '0 0 12px rgba(0, 255, 0, 0.5)',
  },
  '.MuiSelect-select': {
    padding: '12.5px 12px',
    backgroundColor: 'var(--color-black)',
    color: 'var(--color-white)',
    '.MuiChip-root': {
      height: '23px',
    },
  },
  '.MuiSvgIcon-root': {
    color: 'var(--color-white)',
  },
};

const iconButtonStyles = {
  position: 'absolute',
  right: '36px',
  height: '36px',
  width: '36px',
  margin: '6px',
  color: 'var(--color-white)',
  marginRight: '4px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  '&:focus': {
    outline: 'none',
  },
};

const menuItemStyles = {
  backgroundColor: 'var(--color-black)',
  color: 'var(--color-white)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'var(--color-white)',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--color-green)',
    color: 'var(--color-black)',
    '&:hover': {
      backgroundColor: 'var(--color-green)',
    },
  },
};

const paperPropsStyles = {
  maxHeight: 330,
  backgroundColor: 'var(--color-black)',
  color: 'var(--color-white)',
  border: '1px solid var(--color-green)',
  marginTop: '6px',
  '& .MuiMenuItem-root': {
    backgroundColor: 'var(--color-black)',
    color: 'var(--color-white)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'var(--color-white)',
    },
    '&.Mui-selected': {
      backgroundColor: 'var(--color-green)',
      color: 'var(--color-black)',
      '&:hover': {
        backgroundColor: 'var(--color-green)',
      },
    },
  },
};
