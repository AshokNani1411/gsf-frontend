import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/invoices',
    exact: true,
    // appLayout: true,
    className: 'invoice',
    component: lazy(() => import('../../views/invoices/index'))
  },
  {
    path: '/customer/invoice/:id',
    exact: true,
    className: 'invoice',
    component: lazy(() => import('../../views/invoices/show'))
  }
]

export default AppRoutes