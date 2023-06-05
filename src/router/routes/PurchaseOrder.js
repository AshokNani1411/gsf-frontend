import { lazy } from "react"

const AppRoutes = [
  {
    path: '/supplier/purchase-orders/orders',
    exact: true,
    // appLayout: true,
    className: 'purchase-orders',
    component: lazy(() => import('../../views/purchase-orders/orders'))
  },
  {
    path: '/supplier/purchase-orders/order/:id',
    exact: true,
    className: 'purchase-orders',
    component: lazy(() => import('../../views/purchase-orders/orders/show'))
  }
]

export default AppRoutes