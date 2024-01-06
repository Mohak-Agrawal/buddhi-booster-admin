import { Box, Card, Grid } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import logo from '../assets/images/logos/logo.png';
import AuthLogin from '../views/authentication/authForms/AuthLogin';
const Login = () => {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          backgroundColor: '#3C5284',
          backgroundImage: "url('../../../assets/images/backgrounds/bluebg.png')",
          // '&:before': {
          //   content: '""',
          //   backgroundImage: '../../../assets/images/backgrounds/bluebg.png',
          //   // backgroundSize: '400% 400%',
          //   animation: 'gradient 15s ease infinite',
          //   position: 'absolute',
          //   height: '100%',
          //   width: '100%',
          //   opacity: '0.3',
          // },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img src={logo} style={{ width: '50%' }} />
              </Box>
              <AuthLogin />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login;
