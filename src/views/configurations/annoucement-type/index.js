// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Eye, Trash2} from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Card, Input, CardHeader, CardTitle, Button, Label } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Moment from 'react-moment'

const mySwal = withReactContent(Swal)

const DocumentComponent = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem('userData'))


  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Announcement Type</CardTitle>
            </CardHeader>

          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DocumentComponent
