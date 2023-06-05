import { lazy } from "react"

const AppRoutes = [
   {
    path: '/customer/service-request',
    exact: true,
    // appLayout: true,
    className: 'service-request',
    component: lazy(() => import('../../views/service-request'))
  },
  {
    path: '/customer/service-request/shop',
    exact: true,
    // appLayout: true,
    className: 'service-request',
    component: lazy(() => import('../../views/service-request/index1'))
  },
  {
    path: '/customer/service-request/create',
    exact: true,
    className: 'service-request',
    component: lazy(() => import('../../views/service-request/create')),
    meta: {
      navLink: '/customer/service-request'
    }
  },
  {
                path: '/customer/service-request/detail/:id',
                exact: true,
                className: 'service-request',
                component: lazy(() => import('../../views/service-request/create')),
                meta: {
                  navLink: '/customer/service-request'
                }
              },
  {
    path: '/customer/service-request/edit/:id',
    exact: true,
    className: 'service-request',
    component: lazy(() => import('../../views/service-request/create')),
    meta: {
      navLink: '/customer/service-request'
    }
    }
]

export default AppRoutes