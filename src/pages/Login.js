import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../views/authentication/authForms/AuthLogin';
import logo from '../assets/images/logos/logo.png';
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
                {/* <Logo /> */}
                <img src={logo} style={{ width: '50%' }} />
              </Box>
              <AuthLogin
                subtitle={
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login;
