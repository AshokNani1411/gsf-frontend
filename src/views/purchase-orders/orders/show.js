import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import OrderService from "../../../services/OrderService"
import { Link } from 'react-router-dom'
import moment from "moment"

const PodDetail = (props) => {
  const [order, setOrder] = useState(null)

  const getDeliveryDetail = id => {
    OrderService.getPurchaseOrderDetail(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setOrder(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const orderId = props.match.params.id
    if (orderId) {
      getDeliveryDetail(orderId)
    }
  }, [])

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          {order ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">PURCHASE ORDER DETAILS</CardTitle>
                <Button type='button' color='secondary' outline tag={Link} to='/supplier/purchase-orders/orders'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>ORDER</Label>
                      <Col sm='8'>
                        <Input value={order.POHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>PRE-RECEIPT</Label>
                      <Col sm='8'>
                        <Input value={order.X1CPTHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={`${order.POHFCY_0} (${order.FCYNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>ORDER DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(order.ORDDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>REFERENCE</Label>
                      <Col sm='8'>
                        <Input value={order.XDROPREF_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>TYPE</Label>
                      <Col sm='8'>
                        <Input value={order.XPOHTYP_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>RECEIPT DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(order.EXTRCPDAT1_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>DELIVERY METHOD</Label>
                      <Col sm='8'>
                        <Input value={`${order.MDL_0} (${order.MDL_DESC})`} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CARRIER</Label>
                      <Col sm='8'>
                        <Input value={`${order.BPTNUM_0} (${order.BPTNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { order.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            <th className="no-wrap">PRE-RECEIPT</th>
                            <th className="no-wrap">RECEIPT NUMBER</th>
                            {/* <th className="no-wrap">LINE NUMBER</th> */}
                            <th className="no-wrap">PRODUCT</th>
                            <th className="no-wrap">DESCRIPTION</th>
                            <th className="no-wrap">QTY</th>
                            <th className="no-wrap">WEIGHT</th>
                            <th className="no-wrap">VOLUME</th>
                            <th className="no-wrap">GROSS PRICE</th>
                            <th className="no-wrap text-right">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { order.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.X1CPTHNUM_0}</td>
                                <td>{item.PTHNUM_0}</td>
                                {/* <td>{item.POPLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES_0}</td>
                                <td>{item.QTYSTU_0}</td>
                                <td>{item.QTYWEU_0} {item.LINWEU_0}</td>
                                <td>{item.QTYVOU_0} {item.LINVOU_0}</td>
                                <td>{item.GROPRI_0}</td>
                                <td className='text-right'>{item.LINAMT_0}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table> : <p className="text-center mb-0">No data found</p> }
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
          ) : ''}
        </Col>
      </Row>
    </div>
  )
}

export default PodDetail
