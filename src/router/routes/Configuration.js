import { lazy } from "react"

const AppRoutes = [
  {
    path: '/admin/config/doctype',
    exact: true,
    // appLayout: true,
    className: 'configuration',
    component: lazy(() => import('../../views/configurations/document-type')),
    meta: {
      navLink: 'admin/config/doctype'
    }
  },
  {
    path: '/admin/config/annoucementtype',
    exact: true,
    // appLayout: true,
    className: 'configuration',
    component: lazy(() => import('../../views/configurations/annoucement-type')),
    meta: {
      navLink: 'admin/config/annoucementtype'
    }
  }
]

export default AppRoutes