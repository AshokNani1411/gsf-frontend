// ** Redux Imports
import {
  combineReducers
} from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from './user'
import customers from './customer'
import businessPartners from './business-partner'
import languages from './language'
import designations from './designation'
import contacts from './contact'
import announcements from './announcement'
import discussionForums from './discussion-forum'
import documents from './document'
import customerConCodes from './customer-concode'
import suppliers from './supplier'
import supplierConCodes from './supplier-concode'
import sites from './site'
import addresses from './common/address'
import productCategories from './product-category'
import soCart  from './socart'
import carriers from './common/carrier'
import deliveryModes from './common/deliver-mode'
import mapData from './map'
import roles from './role'
import products from './product'
import productsPrice from './product-price'
import paymentInvoices from './payment-invoice'
import installbases from './install-base'
import productConsumptions from './product-consumption'
import orders from './order'
import returns from './return'
import payments from './payment'
import quotes from './quote'
import purchaseOrders from './purchase-order'
import pickupRequests from './pickup-request'
import dropRequests from './drop-request'
import serviceRequests from './service-request'
import deliveries from './delivery'
import calendar from '@src/views/tms-planning/calendar/store/reducer'
import ecommerce from '@src/views/ecommerce/store/reducer'
import invoices from './invoice'
import purchaseInvoices from './purchase-invoice'
import creditNotes from './credit-note'
import receipts from './receipt'
import dashboard from './dashboard'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  dashboard,
  calendar,
  ecommerce,
  users,
  contacts,
  announcements,
  discussionForums,
  documents,
  customers,
  businessPartners,
  languages,
  designations,
  customerConCodes,
  suppliers,
  supplierConCodes,
  sites,
  addresses,
  productCategories,
  installbases,
  productConsumptions,
  carriers,
  deliveryModes,
  roles,
  products,
  productsPrice,
  paymentInvoices,
  creditNotes,
  soCart,
  orders,
  returns,
  quotes,
  payments,
  purchaseOrders,
  pickupRequests,
  dropRequests,
  serviceRequests,
  deliveries,
  invoices,
  receipts,
  purchaseInvoices,
  mapData
})

export default rootReducer