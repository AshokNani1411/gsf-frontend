import { lazy } from "react"

const role = JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).XDESC_0

const AppRoutes = [
  {
    path: '/admin/users',
    exact: true,
    // appLayout: true,
    className: 'users',
    component: role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/users')) : lazy(() => import('../../views/NotAuthorized'))
  },
  {
    path: '/admin/users/create',
    exact: true,
    className: 'create-user',
    component:  role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/users/create')) : lazy(() => import('../../views/NotAuthorized')),
    meta: {
      navLink: '/users'
    }
  },
  {
    path: '/admin/users/edit/:id',
    exact: true,
    className: 'create-user',
    component: role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/users/create')) : lazy(() => import('../../views/NotAuthorized')),
    meta: {
      navLink: '/users'
    }
  },
  {
    path: '/admin/users/view/:id',
    exact: true,
    className: 'create-user',
    component: role && role.toLowerCase() === 'admin' ? lazy(() => import('../../views/users/show')) : lazy(() => import('../../views/NotAuthorized')),
    meta: {
      navLink: '/users'
    }
  }
]

export default AppRoutes