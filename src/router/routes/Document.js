import { lazy } from "react"

const AppRoutes = [
  {
    path: '/admin/document',
    exact: true,
    // appLayout: true,
    className: 'document',
    component: lazy(() => import('../../views/document/index1')),
    meta: {
      navLink: '/document'
    }
  },
  {
    path: '/admin/document/create',
    exact: true,
    // appLayout: true,
    className: 'document',
    component: lazy(() => import('../../views/document/create')),
    meta: {
      navLink: '/document'
    }
  },
  {
    path: '/admin/document/edit/:id',
    exact: true,
    // appLayout: true,
    className: 'document',
    component: lazy(() => import('../../views/document/create')),
    meta: {
      navLink: '/document'
    }
  }
]

export default AppRoutes