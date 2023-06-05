import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import OrderService from "../../../services/OrderService"
import { Link } from 'react-router-dom'
import moment from "moment"

const PodDetail = (props) => {
  const [order, setOrder] = useState(null)

  const getDeliveryDetail = id => {
    OrderService.getSalesOrderDetail(id)
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
                <CardTitle tag='h4' className="mb-0">SALES ORDER DETAILS</CardTitle>
                <Button type='button' style={{backgroundColor : "#217f69", color : "white"}} outline tag={Link} to='/customer/sales-orders/orders'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>ORDER</Label>
                      <Col sm='8'>
                        <Input value={order.SOHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={`${order.SALFCY_0} (${order.FCYNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>REFERENCE</Label>
                      <Col sm='8'>
                        <Input value={order.CUSORDREF_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>DELIVERY MODE</Label>
                      <Col sm='8'>
                        <Input value={`${order.MDL_0} (${order.MDL_DESC})`} disabled/>
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
                      <Label sm='4'>DELIVERY DATE</Label>
                      <Col sm='8'>
                      <Input value={moment(order.DEMDLVDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>DELIVERY LEAD TIME</Label>
                      <Col sm='8'>
                        <Input value={order.DAYLTI_0} disabled/>
                      </Col>
                    </FormGroup>
                     <FormGroup row>
                                                              <Label sm='4'>DELIVERY ADDRESS</Label>
                                                              <Col sm='8'>
                                                                <Input value={`${order.BPAADD_0} - ${order.BPDNAM_0}`} disabled/>
                                                              </Col>
                                                            </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>SHIPMENT DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(order.SHIDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CURRENCY</Label>
                      <Col sm='8'>
                        <Input value={order.CUR_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CARRIER</Label>
                      <Col sm='8'>
                        <Input value={`${order.BPTNUM_0} (${order.BPTNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                                          <Label sm='4'>PAYMENT TERM</Label>
                                          <Col sm='8'>
                                            <Input value={`${order.PTE_0} (${order.TEXTE_0})`} disabled/>
                                          </Col>
                                        </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { order.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            {/* <th>LINE NUMBER</th> */}
                            <th>PRODUCT</th>
                            <th>DESCRIPTION</th>
                            <th>ORDER QTY</th>
                            <th>PRICE</th>
                            {/* <th>DELIVERED QTY</th> */}
                            <th className='text-right'>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { order.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>{item.SOPLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES_0}</td>
                                <td>{item.QTY_0} {item.SAU_0}</td>
                                <td>{item.NETPRI_0} {order.CUR_0}</td>
                                {/* <td>{item.DLVQTY_0}</td> */}
                                <td className='text-right'>{item.ToTal_Amount} {order.CUR_0} </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table> : <p className="text-center mb-0">No data found</p> }
                    </div>
                  </Col>
                     <hr />
                   <Col sm='8'>
                   </Col>
                             <Col sm='4' className="mt-5">
                             <FormGroup row>
                                                   <Label sm='4'><strong>TOTAL AMOUNT (Incl.TAX) </strong></Label>
                                                   <Col sm='8'>
                                                      <Input className='text-right' value={`${order.ORDINVATI_0} ${order.CUR_0}`} disabled/>
                                                   </Col>
                                                 </FormGroup>


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
