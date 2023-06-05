import { lazy } from "react"
import { Redirect } from "react-router-dom/cjs/react-router-dom"

const AppRoutes = [
  {
    path: '/customer/ecommerceB2B/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2B/shop'))
  },
  {
    path: '/customer/ecommerceB2B/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2B/wishlist'))
  },
  {
    path: '/customer/ecommerceB2B/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/customer/ecommerce-B2B/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/customer/ecommerceB2B/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2B/detail')),
    meta: {
      navLink: '/ecommerce-B2B/product-detail'
    }
  },
  {
    path: '/customer/ecommerceB2B/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/ecommerce-B2B/checkout'))
  }
]

export default AppRoutes