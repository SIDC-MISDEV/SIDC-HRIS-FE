import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  
  {
    id: 'dashboard',
    title: 'Dashboard',
    //translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'collapsible',
    role: ['SupplyChainRegionalManager'],
    icon: 'home',
    // badge: {
    //   title: '3',
    //   translate: 'MENU.DASHBOARD.BADGE',
    //   classes: 'badge-light-warning badge-pill'
    // },
    children: [
      {
        id: 'analytics',
        title: 'Over All',
       // translate: 'MENU.DASHBOARD.ANALYTICS',
        type: 'item',
        role: ['SupplyChainRegionalManager'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'application/dashboard/analytics'
      },
   
    ]
  },

  {
    id: 'inventory',
    type: 'collapsible',
    title: 'Inventory',
    //translate: 'MENU.APPS.SECTION',
    role: ['SupplyChainRegionalManager'],
    icon: 'package',
    children: [
      // {
      //   id: 'inter-branch',
      //   title: 'Interbranch',
      //   //translate: 'MENU.DASHBOARD.ANALYTICS',
      //   type: 'item',
      //   role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
      //   icon: 'circle',
      //   url: 'application/inventory/inter-branch'
      // },
      {
        id: 'issuance',
        title: 'Issuance',
        //translate: 'MENU.DASHBOARD.ANALYTICS',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        disabled: false,
        url: 'application/inventory/issuance'
      },
    ]
  },

  {
    id: 'apps',
    type: 'section',
    title: 'Apps & Pages',
    translate: 'MENU.APPS.SECTION',
    role: ['SupplyChainRegionalManager'],
    icon: 'package',
    children: [
      {
        id: 'email',
        title: 'Report',
        translate: 'MENU.REPORTS',
        type: 'item',
        icon: 'list',
        role: ['SupplyChainRegionalManager'],
        url: 'application/report',
      },
    ]
  },
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   translate: 'MENU.HOME',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'application/dashboard',
  //   role: ['Admin'],

  // },
  // {
  //   id: 'report',
  //   title: 'Report',
  //   translate: 'MENU.REPORTS',
  //   type: 'item',
  //   icon: 'file',
  //   url: 'application/report',
  //   role: ['Admin'],

  // },
  // {
  //   id: 'home',
  //   title: 'Home',
  //   translate: 'MENU.HOME',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'home',
  //   role: ['Basic']
  // },
  // {
  //   id: 'purchases',
  //   title: 'Purchases',
  //   translate: 'MENU.PURCHASES',
  //   type: 'item',
  //   icon: 'shopping-bag',
  //   url: 'purchases',
  //   role: ['Basic']
  // },
  // {
  //   id: 'shareCapital',
  //   title: 'Share Capital',
  //   translate: 'MENU.SHARE_CAPITAL',
  //   type: 'item',
  //   icon: 'trending-up',
  //   url: 'share-capital',
  //   role: ['Basic']
  // },
  // {
  //   id: 'contactUs',
  //   title: 'Contact Us',
  //   translate: 'MENU.CONTACT_US',
  //   type: 'item',
  //   icon: 'phone',
  //   url: 'contact-us',
  //   role: ['Basic']
  // },
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   translate: 'MENU.DASHBOARD',
  //   type: 'item',
  //   icon: 'home',
  //   url: 'admin/dashboard',
  //   role: ['Admin'],
  // },
  // {
  //   id: 'applicant',
  //   title: 'Applicants',
  //   translate: 'MENU.APPLICANTS',
  //   type: 'item',
  //   icon: 'user-plus',
  //   url: 'admin/applicants',
  //   role: ['Admin'],
  // },
  // {
  //   id: 'member',
  //   title: 'Members',
  //   translate: 'MENU.MEMBERS',
  //   type: 'item',
  //   icon: 'users',
  //   url: 'admin/members',
  //   role: ['Admin'],
  // },
  // {
  //   id: 'events',
  //   title: 'Events',
  //   translate: 'MENU.EVENTS',
  //   type: 'item',
  //   icon: 'calendar',
  //   url: 'admin/events',
  //   role: ['Admin'],
  // },
  // {
  //   id: 'announcements',
  //   title: 'Announcements',
  //   translate: 'MENU.ANNOUNCEMENTS',
  //   type: 'item',
  //   icon: 'bell',
  //   url: 'admin/announcements',
  //   role: ['Admin'],
  // },
  // {
  //   id: 'setup',
  //   title: 'Setup',
  //   translate: 'MENU.SETUP',
  //   type: 'collapsible',
  //   icon: 'tool',
  //   role: ['Admin'],
  //   children: [
  //     {
  //       id: 'membershipRequirements',
  //       title: 'Requirements',
  //       type: 'item',
  //       url: 'admin/setup/membership-requirements',
  //     }
  //   ]
  // },
  
  // {
  //   id: 'settings',
  //   title: 'Settings',
  //   translate: 'MENU.SETTINGS',
  //   type: 'collapsible',
  //   role: ['Basic', 'Admin'],
  //   icon: 'settings',
  //   children: [
  //   ]
  // },
]
