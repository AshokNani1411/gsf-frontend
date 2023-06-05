import { lazy } from "react"

const role = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).XDESC_0

const AppRoutes = [
  {
    path: '/admin/contact',
    exact: true,
    // appLayout: true,
    className: 'contact',
    component: role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/contact')) : lazy(() => import('../../views/NotAuthorized'))
  },
  {
    path: '/admin/contact/create',
    exact: true,
    className: 'create-contact',
    component:  role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/contact/create')) : lazy(() => import('../../views/NotAuthorized')),
    meta: {
      navLink: '/contact'
    }
  },
  {
    path: '/admin/contact/edit/:id',
    exact: true,
    className: 'create-contact',
    component: role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/contact/create')) : lazy(() => import('../../views/NotAuthorized')),
    meta: {
      navLink: '/contact'
    }
  }
]

export default AppRoutes