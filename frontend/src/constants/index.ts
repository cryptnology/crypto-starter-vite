import {
  Dashboard,
  CreateCampaign,
  Payment,
  Withdraw,
  Profile,
  Logout,
} from '../icons';

export const navlinks = [
  {
    name: 'dashboard',
    icon: Dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    icon: CreateCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    icon: Payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    icon: Withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    icon: Profile,
    link: '/profile',
  },
  {
    name: 'logout',
    icon: Logout,
    link: '/',
    disabled: true,
  },
];
