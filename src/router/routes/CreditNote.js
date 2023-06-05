import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/creditnote',
    exact: true,
    // appLayout: true,
    className: 'creditnote',
    component: lazy(() => import('../../views/credit-notes/index'))
  },
  {
    path: '/customer/creditnote/:id',
    exact: true,
    className: 'creditnote',
    component: lazy(() => import('../../views/credit-notes/show'))
  }
]

export default AppRoutes