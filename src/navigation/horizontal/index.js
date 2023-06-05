import { Home, Package, Calendar, FileText, Circle, Clipboard } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'TMS Dashboard',
    icon: <Home size={20} />,
    navLink: '/customer/dashboard'
  },
  {
    id: 'salesorders',
    title: 'Sales Orders',
    icon: <Package size={20} />,
    children: [
      {
        id: 'orders',
        title: 'Orders',
        icon: <Circle size={12} />,
        navLink: '/sales-orders/orders'
      },
      {
        id: 'calendarview',
        title: 'Calendar View',
        icon: <Circle size={12} />,
        navLink: '/sales-orders/calendar'
      },
      {
        id: 'mapview',
        title: 'Map View',
        icon: <Circle size={12} />,
        navLink: '/mapview'
      },
      {
        id: 'productstats',
        title: 'Stats - By Product',
        icon: <Circle size={12} />,
        navLink: '/productstats'
      },
      {
        id: 'chartbyperiod',
        title: 'Stats - By Period',
        icon: <Circle size={12} />,
        navLink: '/chartbyperiod'
      }
    ]
  },
  {
    id: 'deliveries',
    title: 'Deliveries',
    icon: <Calendar size={20} />,
    children: [
      {
        id: 'trackshipments',
        title: 'Track Shipments',
        icon: <Circle size={12} />,
        navLink: '/trackshipments'
      },
      {
        id: 'deliveriesv1',
        title: 'Deliveries V1',
        icon: <Circle size={12} />,
        navLink: '/deliveriesv1'
      },
      {
        id: 'deliveriesv2',
        title: 'Deliveries V2',
        icon: <Circle size={12} />,
        navLink: '/deliveriesv2'
      }
    ]
  },
  {
    id: 'invoices',
    title: 'Invoices',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoices',
        title: 'Invoices',
        icon: <Circle size={12} />,
        navLink: '/invoices'
      }
    ]
  },
  {
    id: 'managerequest',
    title: 'Manage Request',
    icon: <Clipboard size={20} />,
    children: [
      {
        id: 'droprequest',
        title: 'Drop Request',
        icon: <Circle size={12} />,
        navLink: '/droprequest'
      }
    ]
  }
]
