import { lazy } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom"

const AppRoutes = [
  {
    path: '/customer/ecommerceB2C/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2C/shop'))
  },
  {
    path: '/customer/ecommerceB2C/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2C/wishlist'))
  },
  {
    path: '/customer/ecommerceB2C/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/customer/ecommerce-B2C/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/customer/ecommerceB2C/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2C/detail')),
    meta: {
      navLink: '/ecommerce-B2C/product-detail'
    }
  },
  {
    path: '/customer/ecommerceB2C/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2C/checkout'))
  }
]

export default AppRoutes