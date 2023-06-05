// ** Third Party Components
import axios from 'axios'
import { Badge, Table } from 'reactstrap'

const status = {
  1: { title: 'Scheduled', color: 'light-info' },
  2: { title: 'In Progress', color: 'light-dark' },
  3: { title: 'Completed', color: 'light-success' }
}

export let data

// ** Get initial Data
axios.get('/api/deliveries-v1/initial-data').then(response => {
  data = response.data
})

// ** Expandable table component
const DeliveriesV1 = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Delivery</th>
            <th>Product</th>
            <th>Order QTY</th>
            <th>DLV QTY</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td><strong className="text-dark">251624DL</strong></td>
            <td>10</td>
            <td>0</td>
          </tr>
          <tr>
            <td></td>
            <td><strong className="text-dark">251624DL</strong></td>
            <td>10</td>
            <td>0</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Document',
    selector: 'document',
    sortable: true,
    minWidth: '200px',
    cell: row => {
      return (
        <strong className="text-dark">{row.document}</strong>
      )
    }
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    minWidth: '150px',
    cell: row => {
      return (
        <Badge color={status[row.status].color} pill>
          {status[row.status].title}
        </Badge>
      )
    }
  },
  {
    name: 'Type',
    selector: 'type',
    sortable: true,
    width: '80px'
  },
  {
    name: 'Vehicle',
    selector: 'vehicle',
    sortable: true,
    minWidth: '120px'
  },
  {
    name: 'Scheduled ETA Date',
    selector: 'scheduled_eta_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-success">{row.scheduled_eta_date}</strong>
      )
    }
  },
  {
    name: 'Scheduled ETA Time',
    selector: 'scheduled_eta_time',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-success">{row.scheduled_eta_time}</strong>
      )
    }
  },
  {
    name: 'Scheduled ETD Date',
    selector: 'scheduled_etd_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-success">{row.scheduled_etd_date}</strong>
      )
    }
  },
  {
    name: 'Scheduled ETD Time',
    selector: 'scheduled_etd_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-success">{row.scheduled_etd_date}</strong>
      )
    }
  },
  {
    name: 'Revised ETA Date',
    selector: 'revised_eta_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-warning">{row.revised_eta_date}</strong>
      )
    }
  },
  {
    name: 'Revised ETA Time',
    selector: 'revised_eta_time',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-warning">{row.revised_eta_time}</strong>
      )
    }
  },
  {
    name: 'Revised ETD Date',
    selector: 'revised_etd_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-warning">{row.revised_etd_date}</strong>
      )
    }
  },
  {
    name: 'Revised ETD Time',
    selector: 'revised_etd_time',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-warning">{row.revised_etd_time}</strong>
      )
    }
  },
  {
    name: 'Actual Depart Date',
    selector: 'actual_depart_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-info">{row.actual_depart_date}</strong>
      )
    }
  },
  {
    name: 'Actual Depart Time',
    selector: 'actual_depart_time',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-info">{row.actual_depart_time}</strong>
      )
    }
  },
  {
    name: 'Actual Arrival Date',
    selector: 'actual_arrival_date',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-info">{row.actual_arrival_date}</strong>
      )
    }
  },
  {
    name: 'Actual Arrival Time',
    selector: 'actual_arrival_time',
    sortable: true,
    minWidth: '120px',
    cell: row => {
      return (
        <strong className="text-info">{row.actual_arrival_time}</strong>
      )
    }
  }
]

export default DeliveriesV1
