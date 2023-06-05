import { lazy } from "react"

const AppRoutes = [
  {
    path: '/customer/manage-request/drop-request',
    exact: true,
    // appLayout: true,
    className: 'drop-request',
    component: lazy(() => import('../../views/manage-request/drop-request'))
  },
  {
    path: '/customer/manage-request/drop-request/shop',
    exact: true,
    // appLayout: true,
    className: 'drop-request',
    component: lazy(() => import('../../views/manage-request/drop-request/index1'))
  },
  {
    path: '/customer/manage-request/drop-request/create',
    exact: true,
    className: 'drop-request',
    component: lazy(() => import('../../views/manage-request/drop-request/create')),
    meta: {
      navLink: '/customer/manage-request/drop-request'
    }
  },
  {
    path: '/customer/manage-request/drop-request/edit/:id',
    exact: true,
    className: 'drop-request',
    component: lazy(() => import('../../views/manage-request/drop-request/create')),
    meta: {
      navLink: '/customer/manage-request/drop-request'
    }
  },
  {
    path: '/customer/manage-request/drop-request/detail/:id',
    exact: true,
    className: 'drop-request',
    component: lazy(() => import('../../views/manage-request/drop-request/show')),
    meta: {
      navLink: '/customer/manage-request/drop-request'
    }
  },
  {
    path: '/supplier/manage-request/pickup-request',
    exact: true,
    // appLayout: true,
    className: 'pickup-request',
    component: lazy(() => import('../../views/manage-request/pickup-request'))
  },
  {
    path: '/supplier/manage-request/pickup-request/create',
    exact: true,
    className: 'pickup-request',
    component: lazy(() => import('../../views/manage-request/pickup-request/create')),
    meta: {
      navLink: '/supplier/manage-request/pickup-request'
    }
  },
  {
    path: '/supplier/manage-request/pickup-request/edit/:id',
    exact: true,
    className: 'pickup-request',
    component: lazy(() => import('../../views/manage-request/pickup-request/create')),
    meta: {
      navLink: '/supplier/manage-request/pickup-request'
    }
  },
  {
    path: '/supplier/manage-request/pickup-request/detail/:id',
    exact: true,
    className: 'pickup-request',
    component: lazy(() => import('../../views/manage-request/pickup-request/show')),
    meta: {
      navLink: '/supplier/manage-request/pickup-request'
    }
  }, {
        path: '/customer/order/create',
        exact: true,
        className: 'sales-request',
        component: lazy(() => import('../../views/manage-request/sales-order')),
        meta: {
          navLink: '/customer/order/create'
        }
      }, {
              path: '/customer/order/product-detail/:id',
              exact: true,
              className: 'sales-request',
              component: lazy(() => import('../../views/manage-request/sales-order/pagecontent/product-detail')),
              meta: {
                navLink: '/customer/order/create'
              }
            },
    {
            path: '/customer/order/createB2C',
            exact: true,
            className: 'sales-request',
            component: lazy(() => import('../../views/manage-request/so-b2c')),
            meta: {
              navLink: '/customer/order/createB2C'
            }
          }
]

export default AppRoutes