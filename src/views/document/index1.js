// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { retrieveDocuments, deleteDocument } from "./../../redux/actions/document"
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/pages/page-file-manager.scss'
import { Eye, Trash2} from 'react-feather'
import docImg from '@src/assets/images/icons/_doc.png'
import pdfImg from '@src/assets/images/icons/_pdf.png'
import txtImg from '@src/assets/images/icons/_txt.png'
import xlsImg from '@src/assets/images/icons/_xls.png'
import pngImg from '@src/assets/images/icons/_png.png'
import jpgImg from '@src/assets/images/icons/_jpg.png'
import xmlImg from '@src/assets/images/icons/_xml.png'
import pptImg from '@src/assets/images/icons/_ppt.png'
import elseImg from '@src/assets/images/icons/_else.png'
import { Row, Col, Card, Input, CardHeader, CardTitle, Button, Label, CardBody, CardText, CardFooter } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'
import './doc.css'
import {
  MDBCol,
  MDBCardText,
  MDBCard,
  MDBCardFooter,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle
} from "mdb-react-ui-kit"
const mySwal = withReactContent(Swal)

const DocumentComponent = () => {
  // ** State
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
      } else if (type === 'xml') {
               return xmlImg
     } else if (type === 'xls' || type === 'xlsx') {
              return xlsImg
     } else if (type === 'ppt' || type === 'pptx') {
                   return pptImg
     } else {
         return elseImg
     }
  }

  return (
    <div className="w-100 file-manager-application">
      <div className='content-area-wrapper'>
        <Row className="file-manager-main-content w-100">
          <Col sm='12'>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4'>Documents</CardTitle>
              </CardHeader>
              <CardBody>
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
                <div className='file-manager-content-body'>
                  <div className='view-container'>
                  {searchValue.length ? filteredData && filteredData.length > 0 ? filteredData.map((prd, i) => (
                    <Card className="file-manager-item file" key={i}>
                      <div className='card-img-top file-logo-wrapper d-flex'>
                        <div className='d-flex align-items-center justify-content-center w-100'>
                          <img src={ImagePicker(prd.ACTTYP)} height={50}/>
                        </div>
                      </div>
                      <CardBody>
                        <div className='content-wrapper'>
                          <CardText className='file-name mb-0'>{prd.X10CDOCDES_0}</CardText>
                          <CardText className='file-size mb-0'>10kb</CardText>
                        </div>
                        <small className='file-accessed text-muted'>Created On : { moment(prd.X10CDAT_0).format("YYYY-MM-DD HH:MM") }</small>
                      </CardBody>
                      {/* <CardFooter>
                      <div className='d-flex'>
                        <a className='btn btn-icon rounded-circle' target={'_blank'} href={`${process.env.REACT_APP_API_HOST}/uploads/${prd.X10CDOCID_0}`}><Eye size={16} /></a>
                        {userData.X3ROLE_0 === 4 ? (
                        <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDelete(prd.ROWID)} color='flat-danger'>
                          <Trash2 size={16} />
                        </Button.Ripple>
                        ) : '' }
                      </div>
                      </CardFooter> */}
                    </Card>
                  )) : (
                    <Col sm='12'>
                      <Card className="mb-2">
                        <CardBody>
                          <CardTitle className="text-primary text-center my-2" tag='h4'>
                            No documents to display.
                          </CardTitle>
                        </CardBody>
                      </Card>
                    </Col>
                  ) : documents && documents.length > 0 ? documents.map((prd, i) => (
                      <Card className="file-manager-item file" key={i}>
                      <div className='card-img-top file-logo-wrapper d-flex'>
                        <div className='d-flex align-items-center justify-content-center w-100'>
                          <img src={ImagePicker(prd.ACTTYP)} height={50}/>
                        </div>
                      </div>
                      <CardBody>
                        <div className='content-wrapper'>
                          <CardText className='file-name mb-0'>{prd.X10CDOCDES_0}</CardText>
                          <CardText className='file-size mb-0'>10kb</CardText>
                        </div>
                        <small className='file-accessed text-muted'>Created On : { moment(prd.X10CDAT_0).format("YYYY-MM-DD HH:MM") }</small>
                      </CardBody>
                      {/* <CardFooter>
                      <div className='d-flex'>
                        <a className='btn btn-icon rounded-circle' target={'_blank'} href={`${process.env.REACT_APP_API_HOST}/uploads/${prd.X10CDOCID_0}`}><Eye size={16} /></a>
                        {userData.X3ROLE_0 === 4 ? (
                        <Button.Ripple className='btn-icon rounded-circle' onClick={() => onDelete(prd.ROWID)} color='flat-danger'>
                          <Trash2 size={16} />
                        </Button.Ripple>
                        ) : '' }
                      </div>
                      </CardFooter> */}
                    </Card>
                  )) : (
                    <Col sm='12'>
                      <Card className="mb-2">
                        <CardBody>
                          <CardTitle className="text-primary text-center my-2" tag='h4'>
                            No documents to display.
                          </CardTitle>
                        </CardBody>
                      </Card>
                    </Col>
                  )}
                    </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DocumentComponent
