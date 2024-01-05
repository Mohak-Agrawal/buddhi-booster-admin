import { Box, List, useMediaQuery } from '@mui/material';
import { IconAperture, IconChartDonut3, IconPoint } from '@tabler/icons';
import { uniqueId } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import FranchiseMenuItems from './FranchiseMenuItems';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth.user);
  const { subjects } = useSelector((state) => state.subjects);
  console.log({ subjects });

  const AdminMenuItems = [
    {
      navlabel: true,
      subheader: 'Home',
    },
    {
      id: uniqueId(),
      title: 'Home',
      icon: IconAperture,
      href: '/dashboard/home',
      chipColor: 'secondary',
    },

    {
      navlabel: true,
      subheader: 'Content',
    },
    {
      id: uniqueId(),
      title: 'Subjects',
      icon: IconChartDonut3,
      href: '/',
      children: subjects.map((item, index) => ({
        id: item.id,
        title: item.name, // Assuming the subject has a 'name' property
        icon: IconPoint,
        href: `/subjects/${item.id}`, // Assuming each subject has an 'id' property
      })),
    },
    {
      id: uniqueId(),
      title: 'Exams',
      icon: IconAperture,
      href: '/dashboard/exams',
    },
    // {
    //   id: uniqueId(),
    //   title: 'Questions',
    //   icon: IconAperture,
    //   href: '/dashboard/questions',
    // },
    {
      id: uniqueId(),
      title: 'Lectures',
      icon: IconAperture,
      href: '/dashboard/lectures',
    },
    {
      navlabel: true,
      subheader: 'Management',
    },
    {
      id: uniqueId(),
      title: 'Users',
      icon: IconAperture,
      href: '/dashboard/users',
    },
    {
      id: uniqueId(),
      title: 'Franchises',
      icon: IconAperture,
      href: '/dashboard/franchises',
    },
  ];

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {(role == 'franchise' ? FranchiseMenuItems : AdminMenuItems).map((item, index) => {
          // {/********SubHeader**********/}
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
