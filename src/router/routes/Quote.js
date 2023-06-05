import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/quotes',
    exact: true,
    // appLayout: true,
    className: 'quotes',
    component: lazy(() => import('../../views/quotes'))
  },
  {
    path: '/customer/quotes/order/:id',
    exact: true,
    className: 'quotes',
    component: lazy(() => import('../../views/quotes/show'))
  }
]

export default AppRoutes