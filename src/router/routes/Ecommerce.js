import { lazy } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom"

const AppRoutes = [
  {
    path: '/customer/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/shop'))
  },
  {
    path: '/customer/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/wishlist'))
  },
  {
    path: '/customer/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/customer/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/customer/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/detail')),
    meta: {
      navLink: '/ecommerce/product-detail'
    }
  },
  {
    path: '/customer/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce/checkout'))
  }
]

export default AppRoutes