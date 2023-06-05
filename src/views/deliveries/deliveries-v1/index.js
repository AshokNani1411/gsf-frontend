// ** React Imports
import { useState } from 'react'

// ** Table columns & Expandable Data
import ExpandableTable, { data, columns } from './data'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'

const DeliveriesV1Component = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = data && data.filter(item => {
        const startsWith =
          item.document.toLowerCase().startsWith(value.toLowerCase()) ||
          item.vehicle.toLowerCase().startsWith(value.toLowerCase()) ||
          item.type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.scheduled_eta_date.toLowerCase().startsWith(value.toLowerCase()) ||
          item.scheduled_eta_time.toLowerCase().startsWith(value.toLowerCase()) ||
          item.scheduled_etd_date.toLowerCase().startsWith(value.toLowerCase())

        const includes =
          item.document.toLowerCase().includes(value.toLowerCase()) ||
          item.vehicle.toLowerCase().includes(value.toLowerCase()) ||
          item.type.toLowerCase().includes(value.toLowerCase()) ||
          item.scheduled_eta_date.toLowerCase().includes(value.toLowerCase()) ||
          item.scheduled_eta_time.toLowerCase().includes(value.toLowerCase()) ||
          item.scheduled_etd_date.toLowerCase().includes(value.toLowerCase())

        if (startsWith) {
          return startsWith
        } else if (!startsWith && includes) {
          return includes
        } else return null
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={searchValue.length ? filteredData.length / 10 : data.length / 10 || 1}
      breakLabel={'...'}
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName={'active'}
      pageClassName={'page-item'}
      nextLinkClassName={'page-link'}
      nextClassName={'page-item next'}
      previousClassName={'page-item prev'}
      previousLinkClassName={'page-link'}
      pageLinkClassName={'page-link'}
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1'}
    />
  )

  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result

    const columnDelimiter = ','
    const lineDelimiter = '\n'
    const keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    array.forEach(item => {
      let ctr = 0
      keys.forEach(key => {
        if (ctr > 0) result += columnDelimiter

        result += item[key]

        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement('a')
    let csv = convertArrayOfObjectsToCSV(array)
    if (csv === null) return

    const filename = 'export.csv'

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`
    }

    link.setAttribute('href', encodeURI(csv))
    link.setAttribute('download', filename)
    link.click()
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>REPORT OF TMS OPERATIONS</CardTitle>
              <div className='d-flex mt-md-0 mt-1'>
                <UncontrolledButtonDropdown>
                  <DropdownToggle color='secondary' caret outline>
                    <Share size={15} />
                    <span className='align-middle ml-50'>Export</span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    {/* <DropdownItem className='w-100'>
                      <Printer size={15} />
                      <span className='align-middle ml-50'>Print</span>
                    </DropdownItem> */}
                    <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                      <FileText size={15} />
                      <span className='align-middle ml-50'>CSV</span>
                    </DropdownItem>
                    {/* <DropdownItem className='w-100'>
                      <Grid size={15} />
                      <span className='align-middle ml-50'>Excel</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'>
                      <File size={15} />
                      <span className='align-middle ml-50'>PDF</span>
                    </DropdownItem>
                    <DropdownItem className='w-100'>
                      <Copy size={15} />
                      <span className='align-middle ml-50'>Copy</span>
                    </DropdownItem> */}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </div>
            </CardHeader>
            <Row className='justify-content-start mx-0'>
              <Col className='d-flex align-items-center justify-content-start mt-1' lg="3" md='6' sm='12'>
                <Label className='mr-1' for='search-input'>
                  Search
                </Label>
                <Input
                  className='dataTable-filter mb-50'
                  type='text'
                  bsSize='sm'
                  id='search-input'
                  value={searchValue}
                  onChange={handleFilter}
                />
              </Col>
            </Row>
            <DataTable
              noHeader
              pagination
              data={searchValue.length ? filteredData : data}
              expandableRows
              columns={columns}
              paginationPerPage={10}
              expandOnRowClicked
              className='react-dataTable'
              sortIcon={<ChevronDown size={10} />}
              paginationDefaultPage={currentPage + 1}
              expandableRowsComponent={<ExpandableTable />}
              paginationRowsPerPageOptions={[10, 25, 50, 100]}
              paginationComponent={CustomPagination}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DeliveriesV1Component
