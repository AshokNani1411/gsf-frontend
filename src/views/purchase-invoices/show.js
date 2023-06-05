import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import PurchaseInvoiceService from "../../services/PurchaseInvoiceService"
import { Link } from 'react-router-dom'
import moment from "moment"

const PodDetail = (props) => {
  const [invoice, setInvoice] = useState(null)

  const getInvoiceDetail = id => {
    PurchaseInvoiceService.get(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setInvoice(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  const Approvals = {
    1: "Pending",
    2: "Conflict",
    3: "Delayed",
    4: "Authorized to Pay"
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
                <Button type='button' color='secondary' outline tag={Link} to='/supplier/purchase-invoice'>Back</Button>
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
                        <Input value={`${invoice.PIVTYP_0} (${invoice.INTRMDES_0})`} disabled/>
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
                      <Label sm='4'>DUE DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(invoice.STRDUDDAT_0).format('MM/DD/YYYY')} disabled/>
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
                      <Label sm='4'>PAY APPROVAL</Label>
                      <Col sm='8'>
                        <Input value={Approvals[invoice.PAZ_0]} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>SOURCE DOCUMENT</Label>
                      <Col sm='8'>
                        <Input value={invoice.BPRVCR_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>PRICE</Label>
                      <Col sm='8'>
                        <Input value={invoice.AMTNOT_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>TAX</Label>
                      <Col sm='8'>
                        <Input value={invoice.AMTTAX_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>AMOUNT</Label>
                      <Col sm='8'>
                        <Input value={invoice.AMTATIL_0} disabled/>
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
                            <th className="no-wrap">CURRENCY</th>
                            <th className="no-wrap text-right">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { invoice.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>{item.PIDLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES1_0}</td>
                                <td>{item.QTYUOM_0} {item.STU_0}</td>
                                <td>{item.NETPRI_0}</td>
                                {/* <td>{item.DISCRGVAL1_0}</td> */}
                                <td>{item.NETCUR_0}</td>
                                <td className='text-right'>{item.AMTNOTLIN_0}</td>
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
