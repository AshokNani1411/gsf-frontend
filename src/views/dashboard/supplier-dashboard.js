// ** React Imports
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrieveSupplierDashboardData } from "../../redux/actions/dashboard"

import Moment from 'react-moment'

import { TrendingDown, TrendingUp, Minus, Eye } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Table, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ApexBarChart from './ApexBarChart'
import '@styles/react/libs/charts/apex-charts.scss'
import { Link, useHistory } from 'react-router-dom'

const DashboardComponent = () => {
  // ** State
  const dashboardData = useSelector(state => state.dashboard)
  const history = useHistory()
  const dispatch = useDispatch()
  const [basicModal, setBasicModal] = useState(false)
  const [detail, setDetail] = useState({})
  const userData = JSON.parse(localStorage.getItem('userData'))

  //** ComponentDidMount
  useEffect(() => {
    if (userData) {
      dispatch(retrieveSupplierDashboardData(userData.X3SITE_0, userData.X3USER_0))
    }
  }, [])

  const renderElement = (cur, prev) => {
    if (cur === prev) {
      return (
        <Minus className="text-secondary" size={40} />
      )
    } else if (cur > prev) {
      return (
        <TrendingUp className="text-success" size={40} />
      )
    } else {
      return (
        <TrendingDown className="text-danger" size={40} />
      )
    }
  }

  const gotoDetail = (id) => {
    history.push(`/discussion-forum/${id}`)
  }

  const showDetail = (event, data) => {
    event.preventDefault()
    setBasicModal(!basicModal)
    setDetail(data)
  }

  return (
    <div id='dashboard-analytics' className="w-100">
      { userData && userData.X3ROLE_0 !== 4 ? (
      <Row>
        <Col md="3">
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>REQUESTS</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">{dashboardData.quoteCur}</h1>
                { renderElement(dashboardData.quoteCur, dashboardData.quotePrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="text-primary font-weight-bold h4">{dashboardData.quotePrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>ORDERS</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">{dashboardData.orderCur}</h1>
                { renderElement(dashboardData.orderCur, dashboardData.orderPrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="text-primary font-weight-bold h4">{dashboardData.orderPrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>PURCHASE (USD)</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold"><span>$</span>{dashboardData.salesCur}</h1>
                { renderElement(dashboardData.salesCur, dashboardData.salesPrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="text-primary font-weight-bold h4"><span>$</span>{dashboardData.salesPrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="3">
          <Card>
            <CardHeader>
              <CardTitle tag='h4'>RECEIPTS</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold">{dashboardData.dlvCur}</h1>
                { renderElement(dashboardData.dlvCur, dashboardData.dlvPrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="text-primary font-weight-bold h4">{dashboardData.dlvPrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        { dashboardData && dashboardData.chartData ? (
        <Col md='12'>
          <ApexBarChart chartData={dashboardData.chartData}/>
        </Col>
        ) : ''}
        { dashboardData && dashboardData.secondChartData ? (
        <Col md='12'>
          <ApexBarChart chartData={dashboardData.secondChartData}/>
        </Col>
        ) : ''}
        { dashboardData && dashboardData.supplierSince ? (
        <Col md='12'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>Last Operations</CardTitle>
            </CardHeader>
            <CardBody className='mt-2'>
              <div className='expandable-content'>
                <Table bordered responsive className="child-table w-100">
                  <thead>
                    <tr>
                      <th>DESCRIPTION</th>
                      <th>Created Date</th>
                      <th>Request No.</th>
                      <th className='text-right'>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Supplier Since</td>
                      <td>{dashboardData.supplierSince?.CREDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.supplierSince?.CREDAT_0}</Moment>) : ''}</td>
                      <td></td>
                      <td className='text-right'></td>
                    </tr>
                    <tr>
                      <td>Last Pickup Request</td>
                      <td>{dashboardData.lastPurchaseRequest?.PRQDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastPurchaseRequest?.PRQDAT_0}</Moment>) : ''}</td>
                      {/* <td>{dashboardData.lastPurchaseRequest?.PSHNUM_0}</td> */}
                      <td>
                        <Link to={`/supplier/manage-request/pickup-request/detail/${dashboardData.lastPurchaseRequest?.PSHNUM_0}`}>
                          {dashboardData.lastPurchaseRequest?.PSHNUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastPurchaseRequest?.LINAMT_0}</td>
                    </tr>
                    <tr>
                      <td>Last Purchase Order</td>
                      <td>{dashboardData.lastPurchaseOrder?.ORDDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastPurchaseOrder?.ORDDAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/supplier/purchase-orders/order/${dashboardData.lastPurchaseOrder?.POHNUM_0}`}>
                          {dashboardData.lastPurchaseOrder?.POHNUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastPurchaseOrder?.TOTLINATI_0}</td>
                    </tr>
                    <tr>
                      <td>Last Purchase Receipt</td>
                      <td>{dashboardData.lastPurchaseReceipt?.RCPDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastPurchaseReceipt?.RCPDAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/supplier/receipt/${dashboardData.lastPurchaseReceipt?.PTHNUM_0}`}>
                          {dashboardData.lastPurchaseReceipt?.PTHNUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastPurchaseReceipt?.TOTAMTATI_0}</td>
                    </tr>
                    <tr>
                      <td>Last Purchase Invoice</td>
                      <td>{dashboardData.lastPurchaseInvoice?.ACCDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastPurchaseInvoice?.ACCDAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/supplier/purchase-invoice/${dashboardData.lastPurchaseInvoice?.NUM_0}`}>
                          {dashboardData.lastPurchaseInvoice?.NUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastPurchaseInvoice?.AMTATI_0}</td>
                    </tr>
                    <tr>
                      <td>Last Payment</td>
                      <td>{dashboardData.lastPayment?.ACCDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastPayment?.ACCDAT_0}</Moment>) : ''}</td>
                      <td>{dashboardData.lastPayment?.NUM_0}</td>
                      <td className='text-right'>{dashboardData.lastPayment?.AMTCUR_0}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
        ) : '' }
        { dashboardData && dashboardData.discussions ? (
        <Col md='12' lg='6'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>Discussion Forum</CardTitle>
            </CardHeader>
            <CardBody className='mt-2'>
              <div className='expandable-content'>
                <Table bordered responsive className="child-table w-100">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.discussions?.map((discussion, index) => {
                      return (
                      <tr key={index}>
                        <td><a className='text-primary cursor-pointer' onClick={() => gotoDetail(discussion.X10CFORUMID_0)}>{discussion.ROWID}</a></td>
                        <td>{discussion.X10CTITLE_0}</td>
                        <td>{discussion.X10CTITDES_0}</td>
                        <td><Moment format="MM/DD/YYYY hh:mm A">{discussion.CREDATTIM_0}</Moment></td>
                    </tr>
                    )
                    })}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
        ) : '' }
        { dashboardData && dashboardData.announcements ? (
        <Col md='12' lg='6'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>Announcements</CardTitle>
            </CardHeader>
            <CardBody className='mt-2'>
              <div className='expandable-content'>
                <Table bordered responsive className="child-table w-100">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Subject</th>
                      <th>Description</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.announcements?.map((announcement, index) => { 
                      return (
                      <tr key={index}>
                        <td><a href='#' onClick={(e) => showDetail(e, announcement)}>{announcement.ROWID}</a></td>
                        <td>{announcement.X10CSUBJECT_0}</td>
                        <td><div className='announcement-desc' dangerouslySetInnerHTML={ {__html: announcement.X10CSUBDES_0} }></div></td>
                        <td><Moment format="MM/DD/YYYY hh:mm A">{announcement.CREDATTIM_0}</Moment></td>
                    </tr>
                    )
                    })}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
        ) : '' }
        { dashboardData && dashboardData.documents ? (
        <Col md='12'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>Documents</CardTitle>
            </CardHeader>
            <CardBody className='mt-2'>
              <div className='expandable-content'>
                <Table bordered responsive className="child-table w-100">
                  <thead>
                    <tr>
                      <th>Sr.No.</th>
                      <th>Business Partner</th>
                      <th>Document Type</th>
                      <th>Description</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.documents?.map((document, index) => { 
                      return (
                      <tr key={index}>
                        <td>{document.ROWID}</td>
                        <td>{document.X10CBP_0}</td>
                        <td>{document.X10CDOCTYP_0}</td>
                        <td>{document.X10CDOCDES_0}</td>
                        <td><Moment format="MM/DD/YYYY hh:mm A">{document.CREDATTIM_0}</Moment></td>
                        <td>
                          <a className='btn btn-icon rounded-circle' target={'_blank'} href={`${process.env.REACT_APP_API_HOST}/uploads/${document.X10CDOCID_0}`}><Eye size={16} /></a>
                        </td>
                    </tr>
                    )
                    })}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
        ) : '' }
      </Row>
      ) : ''}
      <Modal isOpen={basicModal} toggle={() => setBasicModal(!basicModal)}>
        <ModalHeader toggle={() => setBasicModal(!basicModal)}>{detail.X10CSUBJECT_0}</ModalHeader>
        <ModalBody>
          <Row>
            <Col sm='12'>
              <div dangerouslySetInnerHTML={ {__html: detail.X10CSUBDES_0} }></div>
            </Col>
          </Row>
          <hr className='mt-0' />
          <small><b>Date:</b> <Moment format="MM/DD/YYYY hh:mm A">{detail.CREDATTIM_0}</Moment></small>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default DashboardComponent
