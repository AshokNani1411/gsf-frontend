import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import CreditNoteService from "../../services/CreditNoteService"
import { Link } from 'react-router-dom'
import moment from "moment"

const PodDetail = (props) => {
  const [invoice, setInvoice] = useState(null)

  const getInvoiceDetail = id => {
    CreditNoteService.get(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setInvoice(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const status = {
    1: 'Not Posted',
    2: 'Not Uesd',
    3: 'Posted'
  }

  useEffect(() => {
    const invoiceId = props.match.params.id
    if (invoiceId) {
      getInvoiceDetail(invoiceId)
    }
  }, [])

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          {invoice ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">INVOICE DETAILS</CardTitle>
                <Button type='button' style={{backgroundColor : "#217f69", color : "white"}} outline tag={Link} to='/customer/invoices'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>INVOICE NO</Label>
                      <Col sm='8'>
                        <Input value={invoice.NUM_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>TYPE</Label>
                      <Col sm='8'>
                        <Input value={`${invoice.SIVTYP_0} (${invoice.INTRMDES_0})`} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>STATUS</Label>
                      <Col sm='8'>
                        <Input value={`${status[invoice.INVSTA_0]}`} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>REFERENCE</Label>
                      <Col sm='8'>
                        <Input value={invoice.INVREF_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>INVOICE DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(invoice.INVDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>ACCOUNTING DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(invoice.ACCDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>SOURCE</Label>
                      <Col sm='8'>
                        <Input value={invoice.SIHORINUM_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>DUE DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(invoice.STRDUDDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                                      <FormGroup row>
                                        <Label sm='4'>CURRENCY</Label>
                                        <Col sm='8'>
                                          <Input value={invoice.CUR_0} disabled/>
                                        </Col>
                                      </FormGroup>
                                    </Col>
                                     <Col md='4'>
                                      <FormGroup row>
                                        <Label sm='4'>PAYMENT TERMS</Label>
                                        <Col sm='8'>
                                          <Input value={`${invoice.PTE_0} (${invoice.PTRMDES_0})`} disabled/>
                                        </Col>
                                      </FormGroup>
                                    </Col>

                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={invoice.FCY_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { invoice.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            {/* <th className="no-wrap">LINE NUMBER</th> */}
                            <th className="no-wrap">PRODUCT</th>
                            <th className="no-wrap">DESCRIPTION</th>
                            <th className="no-wrap">QTY</th>
                            <th className="no-wrap">PRICE</th>
                            {/* <th className="no-wrap">DISCOUNT</th> */}
                            <th className="no-wrap text-right">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { invoice.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>{item.SIDLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES1_0}</td>
                                <td>{item.QTY_0} {item.SAU_0}</td>
                                <td>{item.NETPRI_0} {invoice.CUR_0}</td>
                                {/* <td>{item.DISCRGVAL1_0}</td> */}
                                <td className='text-right'>{item.AMTNOTLIN_0} {invoice.CUR_0}</td>
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
                                                                        <Input className='text-right' value={`${invoice.AMTATI_0} ${invoice.CUR_0}`} disabled/>
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
