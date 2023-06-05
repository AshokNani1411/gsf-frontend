import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, Badge, FormGroup, Label, Input } from 'reactstrap'
import DeliveryDataService from "../../../services/DeliveryService"
import { Link } from 'react-router-dom'
import moment from "moment"

const DeliveryDetail = (props) => {
  const [delivery, setDelivery] = useState(null)

  const getDeliveryDetail = id => {
    DeliveryDataService.getDetail(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setDelivery(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const deliveryId = props.match.params.id
    if (deliveryId) {
      getDeliveryDetail(deliveryId)
    }
  }, [])

  const status = {
    0: { title: 'To-Plan', color: 'light-dark' },
    1: { title: 'Scheduled', color: 'light-info' },
    2: { title: 'On the way', color: 'light-primary' },
    3: { title: 'In-Progress', color: 'light-primary' },
    4: { title: 'Completed', color: 'light-success' },
    5: { title: 'Skipped', color: 'light-warning' },
    6: { title: 'Re-Scheduled', color: 'light-warning' },
    7: { title: 'Cancelled', color: 'light-danger' },
    8: { title: 'To-Plan', color: 'light-dark' }
  }

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          {delivery ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">DELIVERY DETAILS</CardTitle>
                <Button type='button' style={{backgroundColor : "#217f69", color : "white"}} outline tag={Link} to='/customer/deliveries'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='5'>DELIVERY NUMBER</Label>
                      <Col sm='7'>
                        <Input value={delivery.SDHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='5'>SITE</Label>
                      <Col sm='7'>
                        <Input value={`${delivery.SALFCY_0} (${delivery.FCYNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                                          <Label sm='5'>DELIVERY ADDRESS</Label>
                                          <Col sm='7'>
                                            <Input value={`${delivery.BPAADD_0} (${delivery.BPDNAM_0})`} disabled/>
                                          </Col>
                                        </FormGroup>
                    <FormGroup row>
                                                             <Label sm='5'>CURRENCY</Label>
                                                             <Col sm='7'>
                                                               <Input value={delivery.CUR_0} disabled/>
                                                             </Col>
                                                           </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='5'>SHIPMENT DATE</Label>
                      <Col sm='7'>
                        <Input value={moment(delivery.SHIDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='5'>DELIVERY DATE</Label>
                      <Col sm='7'>
                        <Input value={moment(delivery.DLVDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                                          <Label sm='5'>DELIVERY MODE</Label>
                                          <Col sm='7'>
                                            <Input value={`${delivery.MDL_0} (${delivery.MDL_DESC})`} disabled/>
                                          </Col>
                                        </FormGroup>
                    <FormGroup row>
                                                              <Label sm='5'>PAYMENT TERM</Label>
                                                              <Col sm='7'>
                                                                <Input value={`${delivery.PTE_0} (${delivery.TEXTE_0})`} disabled/>
                                                              </Col>
                                                            </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='5'>DELIVERY LEAD TIME</Label>
                      <Col sm='7'>
                        <Input value={delivery.DAYLTI_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='5'>TRANSPORTATION STATUS</Label>
                      <Col sm='7'>
                        <Input value={status[delivery.XDLV_STATUS_0].title} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                                          <Label sm='5'>CARRIER</Label>
                                          <Col sm='7'>
                                            <Input value={`${delivery.BPTNUM_0} (${delivery.BPTNAM_0})`} disabled/>
                                          </Col>
                                        </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { delivery.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            <th>DELIVERY #</th>

                            {/* <th>LINE NO</th> */}
                            <th>PRODUCT</th>
                            <th>DESCRIPTION</th>
                            <th>DELIVERED QTY</th>
                            <th>LOCATION</th>
                            <th>WEIGHT</th>
                            <th>VOLUME</th>
                            <th>PRICE</th>
                          </tr>
                        </thead>
                        <tbody>
                          { delivery.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.SDHNUM_0}</td>
                                {/* <td>{item.SDDLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES_0}</td>
                                <td>{item.QTY_0} {item.SAU_0}</td>
                                <td>{item.LICPLATE_0}</td>
                                <td>{item.DSPLINWEI_0} {item.WEU_0}</td>
                                <td>{item.DSPLINVOL_0} {item.DSPVOU_0}</td>
                                <td className='text-right'>{item.NETPRI_0} {delivery.CUR_0}</td>
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
                                                                        <Input className='text-right' value={`${delivery.DLVINVATI_0} ${delivery.CUR_0}`} disabled/>
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

export default DeliveryDetail
