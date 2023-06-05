import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/sales-returns/returns',
    exact: true,
    // appLayout: true,
    className: 'sales-returns',
    component: lazy(() => import('../../views/sales-returns/returns'))
  },
  {
    path: '/customer/sales-returns/return/:id',
    exact: true,
    className: 'sales-returns',
    component: lazy(() => import('../../views/sales-returns/returns/show'))
  }
]

export default AppRoutes