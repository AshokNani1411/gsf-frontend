import { lazy } from "react"

const AppRoutes = [
  {
    path: '/discussion-forum',
    exact: true,
    // appLayout: true,
    className: 'discussion-forum',
    component: lazy(() => import('../../views/discussion-forum')),
    meta: {
      navLink: '/discussion-forum'
    }
  },
  {
    path: '/discussion-forum/:id',
    exact: true,
    // appLayout: true,
    className: 'discussion-forum',
    component: lazy(() => import('../../views/discussion-forum/show')),
    meta: {
      navLink: '/discussion-forum'
    }
  }
]

export default AppRoutes