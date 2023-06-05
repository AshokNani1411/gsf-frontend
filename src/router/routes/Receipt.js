import { lazy } from "react"

const AppRoutes = [
  {
    path: '/supplier/receipts',
    exact: true,
    // appLayout: true,
    className: 'receipts',
    component: lazy(() => import('../../views/receipts'))
  },
  {
    path: '/supplier/receipts/:id',
    exact: true,
    className: 'receipts',
    component: lazy(() => import('../../views/receipts/show'))
  },
  {
    path: '/supplier/receipt/:id',
    exact: true,
    className: 'receipts',
    component: lazy(() => import('../../views/receipts/detail'))
  }
]

export default AppRoutes