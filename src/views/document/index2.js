// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveDocuments, deleteDocument } from "./../../redux/actions/document"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Eye, Trash2} from 'react-feather'
import docImg from '@src/assets/images/icons/_doc.png'
import pdfImg from '@src/assets/images/icons/_pdf.png'
import txtImg from '@src/assets/images/icons/_txt.png'
import xlsImg from '@src/assets/images/icons/_xls.png'
import pngImg from '@src/assets/images/icons/_png.png'
import jpgImg from '@src/assets/images/icons/_jpg.png'
import xmlImg from '@src/assets/images/icons/_xml.png'
import DataTable from 'react-data-table-component'
import { Row, Col, Card, Input, CardHeader, CardTitle, Button, Label } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
import Moment from 'react-moment'
import './doc.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardGroup,
  MDBCard,
  MDBCardFooter,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBRipple
} from "mdb-react-ui-kit"
const mySwal = withReactContent(Swal)

const DocumentComponent = () => {
  // ** State
  const [currentPage, setCurrentPage] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const documents = useSelector(state => state.documents)
  const dispatch = useDispatch()
  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    dispatch(retrieveDocuments(userData.X3ROLE_0, userData.X3USER_0))
  }, [])

  const onDelete = (id) => {
    return mySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ml-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(deleteDocument(id))
          .then(data => {
            toast.success(
              <ToastContent message='Deleted Successfully' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          })
          .catch(e => {
            console.log(e)
          })
      }
    })
  }

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    let updatedData = []
    setSearchValue(value)

    if (value.length) {
      updatedData = documents && documents.filter(order => {
        let isMatch = false
        Object.keys(order).forEach(key => {
          if (order[key] && order[key] !== " " && order[key].toString().toLowerCase().includes(value.toLowerCase())) {
            isMatch = true
          }
        })
        return isMatch
      })
      setFilteredData(updatedData)
      setSearchValue(value)
    }
  }

  // ** Function to handle filter
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  const columns = [
    {
      name: 'Sr.No',
      selector: 'ROWID',
      sortable: true,
      minWidth: '120px'
    },
    {
      name: 'Business Partner',
      selector: 'X10CBP_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Document Type',
      selector: 'X10CDOCTYP_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Description',
      selector: 'X10CDOCDES_0',
      sortable: true,
      minWidth: '220px'
    },
    {
      name: 'Created At',
      sortable: true,
      minWidth: '180px',
      selector: row => {
        return <Moment format="MM/DD/YYYY hh:mm A">{row.X10CCREDAT_0}</Moment>
      }
    },
    {
      name: 'Created By',
      sortable: true,
      minWidth: '170px',
      selector: 'CREUSR_0'
    },
    {
      name: 'Actions',
      allowOverflow: true,
      cell: row => {
        return (
          <div className='d-flex'>
            <a className='btn btn-icon rounded-circle' target={'_blank'} href={`${process.env.REACT_APP_API_HOST}/uploads/${row.X10CDOCID_0}`}><Eye size={16} /></a>
            {userData.X3ROLE_0 === 4 ? (
            <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDelete(row.ROWID)} color='flat-danger'>
              <Trash2 size={16} />
            </Button.Ripple>
            ) : '' }
          </div>
        )
      }
    }
  ]

  // ** Custom Pagination
  const CustomPagination = () => (
    <ReactPaginate
      previousLabel={''}
      nextLabel={''}
      forcePage={currentPage}
      onPageChange={page => handlePagination(page)}
      pageCount={(searchValue.length) ? filteredData.length / 10 : documents.length / 10 || 1}
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



  const ImagePicker = (type) => {
     if (type === 'txt') {
        console.log("txt file")
        return txtImg
     } else if (type === 'doc' || type === 'docx') {
        return docImg
     } else if (type === 'pdf') {
        return pdfImg
     } else if (type === 'jpg') {
        return jpgImg
      } else if (type === 'png') {
         return pngImg
     } else if (type === 'xls' || type === 'xlsx') {
              return xlsImg
     } else {
         return xlsImg
     }

  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
              <CardTitle tag='h4'>Documents</CardTitle>
            </CardHeader>
            <Row className='justify-content-between mx-0'>
              <Col xl='6' className='d-flex align-items-center justify-content-start mt-1 mb-2'>
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
              <Col xl='6' className='d-flex align-items-center justify-content-end mt-1 mb-2'>
                {userData.X3ROLE_0 === 4 ? (
              <Button.Ripple color='primary' tag={Link} to='/admin/document/create'>
                Create Document
              </Button.Ripple>
              ) : ''}
              </Col>
            </Row>
           <Row>

            {searchValue.length ? filteredData && filteredData.length > 0 ? filteredData.map((prd, i) => (
                               <MDBCol md="2" key={i}>
                               <MDBCard className='cardmain'>
                                   <MDBCardImage src={ImagePicker(prd.ACTTYP)} style ={{ width :"105px", height : "100px", alignSelf : "center" }} position='top'  alt='...' />
                                                                                           <MDBCardBody>
                                                                                             <MDBCardTitle>{prd.X10CDOCDES_0}</MDBCardTitle>
                                                                                             <MDBCardText>
                                                                                                <span>Type :  {prd.ACTTYP}</span> <br />
                                                                                                <span>{prd.X10CDAT_0}</span> <br />
                                                                                                <span>{prd.X10CEXPDAT_0}</span>   <br />
                                                                                                <span>{prd.CREUSR_0}</span> <br />
                                                                                             </MDBCardText>
                                                                                           </MDBCardBody>
                               </MDBCard>

                              </MDBCol>
            )) :         <MDBCol md="12" lg="12" className="mb-4">

                                       <MDBCard className='cardmain h-100'>
                                           <MDBCardTitle>

                                             <h1 className="card-title " style={{fontSize : "18px", paddingTop : "20px"}}>No Documents are available  to display</h1>

                                           </MDBCardTitle>
                                        </MDBCard>
                                </MDBCol>
              : documents && documents.length > 0 ? documents.map((prd, i) => (
                                                <MDBCol md="2" key={i}>
                                               <MDBCard className='cardmain' style={{ boxShadow : "10px 10px gray !important"}}>
                                                    <MDBCardImage src={ImagePicker(prd.ACTTYP)} style ={{ width :"105px", height : "100px", alignSelf : "center", paddingTop : "20px" }} position='left'  alt='...' />
                                                         <MDBCardBody>
                                                           <MDBCardText>
                                                              <span><strong> {prd.X10CDOCDES_0}</strong></span> <br />
                                                              <span>Type :  {prd.ACTTYP}</span> <br />
                                                              <span>Created By : {prd.CREUSR_0}</span> <br />
                                                           </MDBCardText>
                                                         </MDBCardBody>
                                               </MDBCard>
                                               </MDBCol>


                            )) :         <MDBCol md="12" lg="12" className="mb-4">

                                                       <MDBCard className='cardmain h-100'>
                                                           <MDBCardTitle>

                                                             <h1 className="card-title " style={{fontSize : "18px", paddingTop : "20px"}}>No Documents  to display</h1>

                                                           </MDBCardTitle>
                                                        </MDBCard>
                                                </MDBCol>
             }


                </Row>


          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DocumentComponent
