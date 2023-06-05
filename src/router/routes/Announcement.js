import { lazy } from "react"

const AppRoutes = [
  {
    path: '/admin/announcement',
    exact: true,
    // appLayout: true,
    className: 'announcement',
    component: lazy(() => import('../../views/announcement')),
    meta: {
      navLink: '/announcement'
    }
  },
  {
    path: '/admin/announcement/create',
    exact: true,
    // appLayout: true,
    className: 'announcement',
    component: lazy(() => import('../../views/announcement/create')),
    meta: {
      navLink: '/announcement'
    }
  },
  {
    path: '/admin/announcement/edit/:id',
    exact: true,
    // appLayout: true,
    className: 'announcement',
    component: lazy(() => import('../../views/announcement/create')),
    meta: {
      navLink: '/announcement'
    }
  }
]

export default AppRoutes