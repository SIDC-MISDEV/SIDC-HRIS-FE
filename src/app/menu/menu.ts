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
    id: 'apps',
    type: 'section',
    title: 'Apps & Pages',
    translate: 'MENU.APPS.SECTION',
    role: ['SupplyChainRegionalManager'],
    icon: 'package',
    children: [
      {
        id: 'pim',
        title: 'PIM',
        // translate: 'MENU.REPORTS',
        type: 'item',
        icon: 'users',
        role: ['SupplyChainRegionalManager'],
        url: 'admin/pim',
      }
    ]
  },
]
