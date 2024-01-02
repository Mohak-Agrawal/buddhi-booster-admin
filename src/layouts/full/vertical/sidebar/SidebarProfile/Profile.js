import { Box, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { IconPower } from '@tabler/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const customizer = useSelector((state) => state.customizer);
  const userProfile = useSelector((state) => state.auth.user);
  console.log({ userProfile });
  const { userName, role } = userProfile;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  return (
    <Box
      display={'flex'}
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 2, bgcolor: `${'secondary.light'}` }}
    >
      {!hideMenu ? (
        <>
          {/* <Avatar alt="Remy Sharp" src={img1} /> */}

          <Box>
            <Typography variant="h6" color="textPrimary" style={{ fontSize: '14px' }}>
              {userName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {role}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Tooltip title="Logout" placement="top">
              <IconButton
                color="primary"
                component={Link}
                to="/auth/login"
                aria-label="logout"
                size="small"
              >
                <IconPower size="20" />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        ''
      )}
    </Box>
  );
};
