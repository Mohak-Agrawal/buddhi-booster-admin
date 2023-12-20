import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useRoutes } from 'react-router-dom';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import { ThemeSettings } from './theme/Theme';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/dashboard/exam-paper');
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
