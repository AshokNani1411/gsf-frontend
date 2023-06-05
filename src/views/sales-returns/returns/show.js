import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import ReturnService from "../../../services/ReturnService"
import { Link } from 'react-router-dom'
import moment from "moment"

const PodDetail = (props) => {
  const [returns, setReturns] = useState(null)

  const getReturnDetail = id => {
    ReturnService.getSalesReturnDetail(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setReturns(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const orderId = props.match.params.id
    if (orderId) {
      getReturnDetail(orderId)
    }
  }, [])

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          {returns ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">SALES RETURN DETAILS</CardTitle>
                <Button type='button' style={{backgroundColor : "#217f69", color : "white"}} outline tag={Link} to='/customer/sales-returns/returns'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>RETURN NUMBER</Label>
                      <Col sm='8'>
                        <Input value={returns.SRHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={`${returns.STOFCY_0} (${returns.FCYNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>REASON</Label>
                      <Col sm='8'>
                        <Input value={returns.XREASON_0} disabled/>
                      </Col>
                    </FormGroup>

                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>RETURN DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(returns.RTNDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>DELIVERYED DATE</Label>
                      <Col sm='8'>
                      <Input value={returns.DLVDAT_0 === '1753-01-01T00:00:00.000Z' ? '' : moment(returns.DLVDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                     <FormGroup row>
                                                              <Label sm='4'>DELIVERY ADDRESS</Label>
                                                              <Col sm='8'>
                                                                <Input value={`${returns.BPAADD_0} - ${returns.BPDNAM_0}`} disabled/>
                                                              </Col>
                                                            </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>TYPE</Label>
                      <Col sm='8'>
                        <Input value={returns.SRHTYP_0} disabled/>
                      </Col>
                    </FormGroup>
                     <FormGroup row>
                                          <Label sm='4'>DELIVERY MODE</Label>
                                          <Col sm='8'>
                                            <Input value={`${returns.MDL_0} (${returns.MDL_DESC})`} disabled/>
                                          </Col>
                                        </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { returns.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            {/* <th>LINE NUMBER</th> */}
                            <th>PRODUCT</th>
                            <th>DESCRIPTION</th>
                            <th>RETURN QTY</th>
                            <th>PRICE</th>
                            {/* <th>DELIVERED QTY</th> */}
                            <th className='text-right'>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { returns.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>{item.SOPLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES_0}</td>
                                <td>{item.QTY_0} {item.SAU_0}</td>
                                <td>{item.NETPRI_0} {returns.CUR_0}</td>
                                {/* <td>{item.DLVQTY_0}</td> */}
                                <td className='text-right'>{item.ToTal_Amount} {item.CUR_0} </td>
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
