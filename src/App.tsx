import './styles/global.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Container } from '@mui/material';

function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth='xl' sx={{ padding: '16px 0' }}>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
