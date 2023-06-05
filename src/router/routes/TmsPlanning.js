import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/tms-planning/calendar',
    component: lazy(() => import('../../views/tms-planning/calendar'))
  },
  {
    path: '/customer/tms-planning/map',
    component: lazy(() => import('../../views/tms-planning/map'))
  },
  {
    path: '/supplier/tms-planning/calendar',
    component: lazy(() => import('../../views/tms-planning/calendar'))
  },
  {
    path: '/supplier/tms-planning/map',
    component: lazy(() => import('../../views/tms-planning/map'))
  }
]

export default AppRoutes