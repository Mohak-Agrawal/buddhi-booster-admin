import { IconAperture } from '@tabler/icons';

import { uniqueId } from 'lodash';

const FranchiseMenuItems = [
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
    title: 'Exams',
    icon: IconAperture,
    href: '/dashboard/exams',
  },
  {
    id: uniqueId(),
    title: 'Mock Tests',
    icon: IconAperture,
    href: '/dashboard/mock-tests',
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
];

export default FranchiseMenuItems;
