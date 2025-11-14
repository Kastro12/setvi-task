import { AppBar, Container } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position='static' sx={{ background: 'var(--color-white)' }}>
      <Container
        maxWidth='xl'
        sx={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}
      >
        <img
          src='https://cdn.prod.website-files.com/65579b381b1038f59bd3df28/6570543ee4cb15a936814e25_SETVI-svg.webp'
          alt={'setvi logo'}
          loading='lazy'
        />
      </Container>
    </AppBar>
  );
};
export default Navbar;
