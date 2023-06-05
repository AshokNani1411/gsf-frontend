import { lazy } from "react"

const AppRoutes = [
  {
    path: '/supplier/purchase-invoice',
    exact: true,
    // appLayout: true,
    className: 'invoice',
    component: lazy(() => import('../../views/purchase-invoices/index'))
  },
  {
    path: '/supplier/purchase-invoice/:id',
    exact: true,
    // appLayout: true,
    className: 'invoice',
    component: lazy(() => import('../../views/purchase-invoices/show'))
  }
]

export default AppRoutes