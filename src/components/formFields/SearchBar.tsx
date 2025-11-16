import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  setParams: (searchTerm?: { search: string }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search',
  initialValue = '',
  setParams,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialValue);

  useEffect(() => {
    if (initialValue !== searchTerm) {
      setSearchTerm(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (initialValue !== searchTerm) setParams({ search: searchTerm });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleClear = (): void => {
    setSearchTerm('');
    setParams();
  };

  return (
    <FormControl
      sx={{
        position: 'relative',
        width: '100%',
        borderRadius: '4px',
        label: {
          lineHeight: '18px',
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      }}
      variant='outlined'
    >
      <InputLabel htmlFor='search-input'>{placeholder}</InputLabel>
      <OutlinedInput
        id='search-input'
        value={searchTerm}
        onChange={handleSearchChange}
        label='Search'
        fullWidth
        endAdornment={
          <InputAdornment position='end'>
            {searchTerm && (
              <IconButton
                onClick={handleClear}
                size='small'
                sx={{
                  color: 'var(--color-white)',
                  marginRight: '4px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                  '&:focus': {
                    outline: 'none',
                  },
                }}
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            )}
            <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
          </InputAdornment>
        }
        sx={{
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
          '& .MuiInputBase-input': {
            color: 'var(--color-white)',
            padding: '12px 14px',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.5)',
              opacity: 1,
            },
          },
          '& .MuiSvgIcon-root': {
            color: 'var(--color-white)',
          },
        }}
      />
    </FormControl>
  );
};

export default SearchBar;
