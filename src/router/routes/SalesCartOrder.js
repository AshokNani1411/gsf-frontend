import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/order/cart',
    exact: true,
    // appLayout: true,
    className: 'sales-orders-cart',
    component: lazy(() => import('../../views/manage-request/sales-order/cart/index'))
  },
  {
      path: '/customer/order/b2c/cart',
      exact: true,
      // appLayout: true,
      className: 'sales-orders-cart',
      component: lazy(() => import('../../views/manage-request/so-b2c/cart/index'))
    }
]

export default AppRoutes