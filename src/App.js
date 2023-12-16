import { CssBaseline, ThemeProvider } from '@mui/material';
import { useNavigate, useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import { useEffect } from 'react';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard/home');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* <RTL direction={customizer.activeDir}> */}
      <CssBaseline />
      <ScrollToTop>{routing}</ScrollToTop>
      {/* </RTL> */}
    </ThemeProvider>
  );
}

export default App;
