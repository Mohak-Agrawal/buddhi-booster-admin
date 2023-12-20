import { Box, Drawer, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'src/assets/images/logos/logo.png';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { hoverSidebar, toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import Logo from '../../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Profile } from './SidebarProfile/Profile';

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth =
    customizer.isCollapse && !customizer.isSidebarHover
      ? customizer.MiniSidebarWidth
      : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  if (lgUp) {
    return (
      <Box
        sx={{
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: 'absolute',
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              backgroundColor:
                customizer.activeSidebarBg === '#ffffff' && customizer.activeMode === 'dark'
                  ? customizer.darkBackground900
                  : customizer.activeSidebarBg,
              color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box
              px={3}
              pt={2}
              pb={1}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img src={logo} style={{ width: '75%' }} />
              {/* <Typography variant="h">Buddhi Booster</Typography> */}
            </Box>
            <Scrollbar sx={{ height: 'calc(100% - 190px)' }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Scrollbar>
            <Profile />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={customizer.isMobileSidebar}
      onClose={() => dispatch(toggleMobileSidebar())}
      variant="temporary"
      PaperProps={{
        sx: {
          width: customizer.SidebarWidth,
          backgroundColor:
            customizer.activeMode === 'light'
              ? customizer.darkBackground900
              : customizer.activeSidebarBg,
          color: customizer.activeSidebarBg === '#ffffff' ? '' : 'white',
          border: '0 !important',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* ------------------------------------------- */}
      {/* Logo */}
      {/* ------------------------------------------- */}
      <Box px={2}>
        <Logo />
      </Box>
      {/* ------------------------------------------- */}
      {/* Sidebar For Mobile */}
      {/* ------------------------------------------- */}
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
