import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/dashboard',
    exact: true,
    // appLayout: true,
    className: 'dashboard',
    component: lazy(() => import('../../views/dashboard/customer-dashboard'))
  },
  {
    path: '/supplier/dashboard',
    exact: true,
    // appLayout: true,
    className: 'dashboard',
    component: lazy(() => import('../../views/dashboard/supplier-dashboard'))
  }
]

export default AppRoutes