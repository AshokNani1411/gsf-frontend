import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import PaymentService from "../../services/PaymentService"
import { Link } from 'react-router-dom'
import moment from "moment"

const PaymentDetail = (props) => {
  const [payment, setPayment] = useState(null)

  const getDeliveryDetail = id => {
    PaymentService.getPaymentDetail(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setPayment(response.data[0])
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
          {payment ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">PAYMENT DETAILS</CardTitle>
                <Button type='button'style={{backgroundColor : "#217f69", color : "white"}} outline tag={Link} to='/customer/payment'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>Payment Number</Label>
                      <Col sm='8'>
                        <Input value={payment.NUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={`${payment.FCY_0} `} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CONTROL</Label>
                      <Col sm='8'>
                        <Input value={payment.BPRSAC_0} disabled/>
                      </Col>
                    </FormGroup>

                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>ACCOUNTING DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(payment.ACCDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>DUE DATE</Label>
                      <Col sm='8'>
                      <Input value={moment(payment.DUDDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                     <FormGroup row>
                                                              <Label sm='4'>BANK</Label>
                                                              <Col sm='8'>
                                                                <Input value={`${payment.BAN_0}`} disabled/>
                                                              </Col>
                                                            </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                                         <Label sm='4'>ACCOUNT</Label>
                                         <Col sm='8'>
                                           <Input value={payment.ACC_0} disabled/>
                                         </Col>
                                       </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CURRENCY</Label>
                      <Col sm='8'>
                        <Input value={payment.CUR_0} disabled/>
                      </Col>
                    </FormGroup>

                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { payment.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            {/* <th>LINE NUMBER</th> */}
                            <th>Attribute</th>
                            <th>Type</th>
                            <th>Entry No</th>
                            <th className='text-right'>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { payment.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>{item.SOPLIN_0}</td> */}
                                <td><strong className="text-dark">{item.DENCOD_0}</strong></td>
                                <td>{item.VCRTYP_0}</td>
                                <td>{item.VCRNUM_0}</td>
                                {/* <td>{item.DLVQTY_0}</td> */}
                                <td className='text-right'>{item.AMTLIN_0} {payment.CUR_0} </td>
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
                                                   <Label sm='4'><strong>TOTAL AMOUNT </strong></Label>
                                                   <Col sm='8'>
                                                      <Input className='text-right' value={`${payment.AMTCUR_0}  ${payment.CUR_0}`} disabled/>
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

export default PaymentDetail
