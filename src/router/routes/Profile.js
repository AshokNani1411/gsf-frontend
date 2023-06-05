import { lazy } from "react"

const AppRoutes = [
  {
    path: '/profile',
    exact: true,
    // appLayout: true,
    className: 'profile',
    component: lazy(() => import('../../views/profile'))
  }
]

export default AppRoutes