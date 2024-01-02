import { Box, Button, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from 'src/store/api/authApi';
import { loginUser, singleLogin } from 'src/store/slices/authSlice';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [isChecked, setIsChecked] = useState(true);

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const result = await login({ email, password });
      console.log({ result });

      if (result.error) {
        // dispatch(setShowAlert(true));
        return;
      }
      const user = result.data;
      if (user) {
        if (isChecked) {
          console.log('first');
          dispatch(loginUser({ user }));
        } else {
          dispatch(singleLogin(true));
        }
        navigate('/dashboard/home');
        // dispatch(setShowAlert(true));
      }
    } catch (error) {
      // Add logic to handle login error (e.g., display error message)
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField id="email" variant="outlined" fullWidth />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField id="password" type="password" variant="outlined" fullWidth />
          </Box>
          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={
                  <CustomCheckbox
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/auth/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            Sign In
          </Button>
        </Box>
      </form>
      {/* {subtitle} */}
    </>
  );
};

export default AuthLogin;
