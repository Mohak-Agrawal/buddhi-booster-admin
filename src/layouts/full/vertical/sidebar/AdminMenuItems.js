import { IconAperture, IconChartDonut3, IconPoint } from '@tabler/icons';

import { uniqueId } from 'lodash';

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
    children: [
      {
        id: uniqueId(),
        title: 'Abacus',
        icon: IconPoint,
        href: '/subjects/7V74Dk7WiIPhSEjNzoUl',
      },
      {
        id: uniqueId(),
        title: 'Vedic Maths',
        icon: IconPoint,
        href: '/subjects/0k8qmRIS1PRZTuZ9z3n6',
      },
    ],
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
  // {
  //   id: uniqueId(),
  //   title: 'Lectures',
  //   icon: IconAperture,
  //   href: '/dashboard/lectures',
  // },
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

export default AdminMenuItems;
