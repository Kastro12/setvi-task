import { Box, CircularProgress } from '@mui/material';

const LoaderRow = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={24} />
    </Box>
  );
};

export default LoaderRow;
