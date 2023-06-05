import { lazy } from "react"

const AppRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/reset-password',
    component: lazy(() => import('../../views/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  }
]

export default AppRoutes