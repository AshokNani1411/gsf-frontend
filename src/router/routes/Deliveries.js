import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/deliveries',
    exact: true,
    // appLayout: true,
    className: 'deliveries',
    component: lazy(() => import('../../views/deliveries/deliveries-v2'))
  },
  {
    path: '/customer/deliveries/:id',
    exact: true,
    className: 'deliveries',
    component: lazy(() => import('../../views/deliveries/deliveries-v2/show'))
  },
  {
    path: '/customer/delivery/:id',
    exact: true,
    className: 'deliveries',
    component: lazy(() => import('../../views/deliveries/deliveries-v2/detail'))
  }
  // {
  //   path: '/deliveries/v1',
  //   exact: true,
  //   appLayout: true,
  //   className: 'deliveries-v1',
  //   component: lazy(() => import('../../views/deliveries/deliveries-v1'))
  // },
  // {
  //   path: '/deliveries/v2',
  //   exact: true,
  //   appLayout: true,
  //   className: 'deliveries-v2',
  //   component: lazy(() => import('../../views/deliveries/deliveries-v2'))
  // },
  // {
  //   path: '/deliveries/track-shipments',
  //   exact: true,
  //   appLayout: true,
  //   className: 'track-shipments',
  //   component: lazy(() => import('../../views/deliveries/track-shipments'))
  // }
]

export default AppRoutes