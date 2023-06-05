import { lazy } from 'react'
import AuthenticationRoutes from './Authentication'
import AnnouncementRoutes from './Announcement'
import ConfigurationRoutes from './Configuration'
import DiscussionForumRoutes from './DiscussionForum'
import DocumentRoutes from './Document'
import SalesOrderRoutes from './SalesOrder'
import SalesReturnRoutes  from './SalesReturn'
import QuoteRoutes from './Quote'
import PurchaseOrderRoutes from './PurchaseOrder'
import TmsPlanningRoutes from './TmsPlanning'
import ReceiptRoutes from './Receipt'
import DashboardRoutes from './Dashboard'
import UserRoutes from './User'
import ContactRoutes from './Contact'
import DeliveriesRoutes from './Deliveries'
import ManageRequestRoutes from './ManageRequest'
import ServiceRequestRoutes from './ServiceRequest'
import InvoiceRoutes from './Invoice'
import CreditNotes from './CreditNote'
import PaymentRoutes from './Payment'
import SalesCartOrderRoutes from './SalesCartOrder'
import PurchaseInvoiceRoutes from './PurchaseInvoice'
import ProfileRoutes from './Profile'
import EcommerceRoutes from './Ecommerce'
import EcommerceB2CRoutes from './EcommerceB2C'
import EcommerceB2BRoutes from './EcommerceB2B'


// ** Document title
const TemplateTitle = '%s - TMS'

const login = JSON.parse(localStorage.getItem('userData'))
// ** Default Route
const DefaultRoute = 
login ? (login.X3ROLE_0 === 4 ? '/admin/users' : (login.X3ROLE_0 === 2 ? '/customer/sales-orders/orders' : '/supplier/purchase-orders/orders')) : '/login'

// ** Merge Routes
const Routes = [
  ...AuthenticationRoutes,
  ...AnnouncementRoutes,
  ...DiscussionForumRoutes,
  ...DocumentRoutes,
  ...DashboardRoutes,
  ...UserRoutes,
  ...ContactRoutes,
  ...SalesOrderRoutes,
  ...SalesReturnRoutes,
  ...ServiceRequestRoutes,
  ...CreditNotes,
  ...QuoteRoutes,
  ...ConfigurationRoutes,
  ...PurchaseOrderRoutes,
  ...TmsPlanningRoutes,
  ...DeliveriesRoutes,
  ...ManageRequestRoutes,
  ...InvoiceRoutes,
  ...PaymentRoutes,
  ...SalesCartOrderRoutes,
  ...ReceiptRoutes,
  ...PurchaseInvoiceRoutes,
  ...ProfileRoutes,
  ...EcommerceRoutes,
  ...EcommerceB2CRoutes,
   ...EcommerceB2BRoutes,
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
