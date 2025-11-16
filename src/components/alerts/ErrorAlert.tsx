import { Alert } from '@mui/material';

const ErrorAlert = ({ error }: { error: Error }) => {
  return (
    <Alert severity='error'>{error?.message ?? 'Something went wrong. Try again later.'}</Alert>
  );
};

export default ErrorAlert;
