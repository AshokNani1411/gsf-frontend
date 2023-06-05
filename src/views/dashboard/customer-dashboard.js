// ** React Imports
import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrieveDashboardData } from "../../redux/actions/dashboard"
import AppCollapse from '@components/app-collapse'

import Moment from 'react-moment'

import { TrendingDown, TrendingUp, Minus, Eye } from 'react-feather'
import { Row, Col, Card, CardBody, CardHeader, CardTitle, CardText, Table, Modal, ModalHeader, ModalBody } from 'reactstrap'
import ApexBarChart from './ApexBarChart'
import '@styles/react/libs/charts/apex-charts.scss'
import moment from 'moment'
import { Link, useHistory } from 'react-router-dom'

const DashboardComponent = () => {
  // ** State
  const history = useHistory()
  const dispatch = useDispatch()
  const [basicModal, setBasicModal] = useState(false)
  const [detail, setDetail] = useState({})
  const userData = JSON.parse(localStorage.getItem('userData'))
  const dashboardData = useSelector(state => state.dashboard)
  const productData = []

  if (dashboardData.productData) {
    Object.keys(dashboardData.productData).forEach(month => {
      productData.push({
        title: `Period => ${moment(month, 'MM-YY').format('YYYY-MM')}`,
        content: (
          <div className='expandable-content'>
          <Table bordered className="child-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>DESCRIPTION</th>
                <th>SALES ORDER</th>
                <th>ORDER QTY</th>
                <th>DLV QTY</th>
                <th>INVOICED QTY</th>
                <th>WEIGHT</th>
                <th>VOLUME</th>
              </tr>
            </thead>
            <tbody>
              { dashboardData.productData[month].map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.ITMREF_0 }</td>
                    <td>{item.ITMDES_0}</td>
                    <td>{item.ODRCOUNT}</td>
                    <td>{item.QTY_0} {item.QTYUN}</td>
                    <td>{item.DLVQTY_0} {item.QTYUN}</td>
                    <td>{item.INVQTY_0} {item.QTYUN}</td>
                    <td>{item.DSPLINWEI_0} {item.DSPWEU_0}</td>
                    <td>{item.DSPLINVOL_0} {item.DSPVOU_0}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        )
      })
    })
  }

  //** ComponentDidMount
  useEffect(() => {
    if (userData) {
      dispatch(retrieveDashboardData(userData.X3SITE_0, userData.X3USER_0))
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
        <Col md="2">
          <Card style={{backgroundColor : "#6836E9", color : "#fff" }}>
            <CardHeader>
              <CardTitle tag='h4' style={{color : "#fff"}}>QUOTES</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between" style={{color : "#fff"}}>
                <h1 className="font-weight-bold" style={{color : "#fff"}}>{dashboardData.quoteCur}</h1>
                { renderElement(dashboardData.quoteCur, dashboardData.quotePrv) }
              </div>
              <p className="card-text line-ellipsis" style={{color : "#fff"}}><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="font-weight-bold h4" style={{color : "#fff"}}>{dashboardData.quotePrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="2">
          <Card style={{backgroundColor : "#369EE9", color : "#fff" }}>
            <CardHeader>
              <CardTitle tag='h4' style={{color : "#fff"}}>ORDERS</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold" style={{color : "#fff"}}>{dashboardData.orderCur}</h1>
                { renderElement(dashboardData.orderCur, dashboardData.orderPrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="font-weight-bold h4" style={{color : "#fff"}}>{dashboardData.orderPrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="2">
          <Card style={{backgroundColor : "#E9D136", color : "#fff" }}>
            <CardHeader>
              <CardTitle tag='h4' style={{color : "#fff"}}>SALES (EGP)</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold" style={{color : "#fff"}}><span>E£</span>{dashboardData.salesCur}</h1>
                { renderElement(dashboardData.salesCur, dashboardData.salesPrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="font-weight-bold h4" style={{color : "#fff"}}><span>E£</span>{dashboardData.salesPrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="2">
          <Card style={{backgroundColor : "#51E936", color : "#fff" }}>
            <CardHeader>
              <CardTitle tag='h4' style={{color : "#fff"}}>DELIVERIES</CardTitle>
              <CardText className='card-text font-small-2 mr-25 mb-0'>
                <Moment format="MMMM YYYY"></Moment>
              </CardText>
            </CardHeader>
            <CardBody>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="font-weight-bold" style={{color : "#fff"}}>{dashboardData.dlvCur}</h1>
                { renderElement(dashboardData.dlvCur, dashboardData.dlvPrv) }
              </div>
              <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="font-weight-bold h4" style={{color : "#fff"}}>{dashboardData.dlvPrv}</span></p>
            </CardBody>
          </Card>
        </Col>
        <Col md="2">
                  <Card style={{backgroundColor : "#A6C0D5", color : "#fff" }}>
                    <CardHeader>
                      <CardTitle tag='h4' style={{color : "#fff"}}>PAYMENTS</CardTitle>
                      <CardText className='card-text font-small-2 mr-25 mb-0'>
                        <Moment format="MMMM YYYY"></Moment>
                      </CardText>
                    </CardHeader>
                    <CardBody>
                      <div className="d-flex align-items-center justify-content-between">
                        <h1 className="font-weight-bold" style={{color : "#fff"}}><span>E£</span>{dashboardData.paymentCur}</h1>
                        { renderElement(dashboardData.paymentCur, dashboardData.paymentPrv) }
                      </div>
                      <p className="card-text line-ellipsis"><Moment subtract={{ months: 1 }} format="MMMM YYYY"></Moment> : <span className="font-weight-bold h4" style={{color : "#fff"}}><span>E£</span>{dashboardData.paymentPrv}</span></p>
                    </CardBody>
                  </Card>
                </Col>
         <Col md="2">
                           <Card style={{backgroundColor : "#0F5F8A", color : "#fff" }}>
                             <CardHeader>
                               <CardTitle tag='h4' style={{color : "#fff"}}>TOTAL PAYMENT DUE</CardTitle>
                               <CardText className='card-text font-small-2 mr-25 mb-0'>

                               </CardText>
                             </CardHeader>
                             <CardBody>
                               <div className="d-flex align-items-center justify-content-between">
                                 <h1 className="font-weight-bold" style={{color : "#fff"}}><span>E£</span>{dashboardData.paymentDue}</h1>

                               </div>
                               <p className="card-text line-ellipsis"><span className="text-primary font-weight-bold h4">  .</span></p>
                             </CardBody>
                           </Card>
                         </Col>
        { dashboardData && dashboardData.chartData ? (
        <Col md='12'>
          <ApexBarChart chartData={dashboardData.chartData}/>
        </Col>
        ) : ''}
        { productData && productData.length > 0 ? (
        <Col md='12'>
          <Card>
            <CardHeader className='border-bottom' style={{backgroundColor : "moccasin" }}>
              <CardTitle tag='h4' >Sales by Period & Products</CardTitle>
            </CardHeader>
            <CardBody className='mt-2'>
              <AppCollapse data={productData} type='border' accordion/>
            </CardBody>
          </Card>
        </Col>
        ) : ''}
        { dashboardData && dashboardData.secondChartData ? (
        <Col md='12'>
          <ApexBarChart chartData={dashboardData.secondChartData}/>
        </Col>
        ) : ''}
        { dashboardData && dashboardData.customerSince ? (
        <Col md='12'>
          <Card>
            <CardHeader className='border-bottom' style={{backgroundColor : "cadetblue" }}>
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
                      <td>Customer Since</td>
                      <td>{dashboardData.customerSince?.CREDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.customerSince?.CREDAT_0}</Moment>) : ''}</td>
                      <td></td>
                      <td className='text-right'></td>
                    </tr>
                    <tr>
                      <td>Last Quote</td>
                      <td>{dashboardData.lastQuote?.QUODAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastQuote?.QUODAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/customer/quotes/order/${dashboardData.lastQuote?.SQHNUM_0}`}>
                      {dashboardData.lastQuote?.SQHNUM_0} </Link></td>
                      <td className='text-right'>{dashboardData.lastQuote?.QUOATIL_0} {dashboardData.lastQuote?.CUR_0}</td>
                    </tr>
                    <tr>
                      <td>Last Sales Order</td>
                      <td>{dashboardData.lastSalesOrder?.ORDDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastSalesOrder?.ORDDAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/customer/sales-orders/order/${dashboardData.lastSalesOrder?.SOHNUM_0}`}>
                          {dashboardData.lastSalesOrder?.SOHNUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastSalesOrder?.ORDATI_0} {dashboardData.lastSalesOrder?.CUR_0}</td>
                    </tr>
                    <tr>
                      <td>Last Sales Delivery</td>
                      <td>{dashboardData.lastSalesDelivery?.DLVDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastSalesDelivery?.DLVDAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/customer/delivery/${dashboardData.lastSalesDelivery?.SDHNUM_0}`}>
                          {dashboardData.lastSalesDelivery?.SDHNUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastSalesDelivery?.DLVATI_0} {dashboardData.lastSalesDelivery?.CUR_0}</td>
                    </tr>
                    <tr>
                      <td>Last Sales Invoice</td>
                      <td>{dashboardData.lastSalesInvoice?.ACCDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastSalesInvoice?.ACCDAT_0}</Moment>) : ''}</td>
                      <td>
                        <Link to={`/customer/invoice/${dashboardData.lastSalesInvoice?.NUM_0}`}>
                          {dashboardData.lastSalesInvoice?.NUM_0}
                        </Link>
                      </td>
                      <td className='text-right'>{dashboardData.lastSalesInvoice?.AMTATI_0} {dashboardData.lastSalesInvoice?.CUR_0}</td>
                    </tr>
                    <tr>
                      <td>Last Payment</td>
                      <td>{dashboardData.lastPayment?.ACCDAT_0 ? (<Moment format="MM/DD/YYYY">{dashboardData.lastPayment?.ACCDAT_0}</Moment>) : ''}</td>
                      <td> <Link to={`/customer/payment/${dashboardData.lastPayment?.NUM_0}`}>
                      {dashboardData.lastPayment?.NUM_0} </Link></td>
                      <td className='text-right'>{dashboardData.lastPayment?.AMTCUR_0} {dashboardData.lastPayment?.CUR_0}</td>
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
            <CardHeader className='border-bottom' style={{backgroundColor : "#FFC300" }}>
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
                        <td>{discussion.X10CFORUMID_0}</td>
                        <td><a className='text-primary cursor-pointer' onClick={() => gotoDetail(discussion.X10CFORUMID_0)}>{discussion.X10CTITLE_0}</a></td>
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
            <CardHeader className='border-bottom' style={{backgroundColor : "#369EE9", color : "#fff" }}>
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
                        <td>{announcement.X10CSEQ_0}</td>
                        <td><a href='#' onClick={(e) => showDetail(e, announcement)}>{announcement.X10CSUBJECT_0}</a></td>
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
            <CardHeader className='border-bottom' style={{backgroundColor : "turquoise" }}>
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
