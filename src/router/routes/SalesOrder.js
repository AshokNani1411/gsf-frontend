import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/sales-orders/orders',
    exact: true,
    // appLayout: true,
    className: 'sales-orders',
    component: lazy(() => import('../../views/sales-orders/orders'))
  },
  {
    path: '/customer/sales-orders/order/:id',
    exact: true,
    className: 'sales-orders',
    component: lazy(() => import('../../views/sales-orders/orders/show'))
  }
]

export default AppRoutes