import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/payment',
    exact: true,
    // appLayout: true,
    className: 'payment',
    component: lazy(() => import('../../views/payments/index'))
  },
  {
    path: '/customer/payment/:id',
    exact: true,
    className: 'payment',
    component: lazy(() => import('../../views/payments/show'))
  },
  {
      path: '/customer/payment-invoices',
      exact: true,
      className: 'payment',
      component: lazy(() => import('../../views/payments/index2'))
    },
     {
          path: '/customer/payment/pay',
          exact: true,
          className: 'payment',
          component: lazy(() => import('../../views/payments/paymentList'))
        }
]

export default AppRoutes