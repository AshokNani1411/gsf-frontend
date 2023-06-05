import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import ReceiptDataService from "../../services/ReceiptService"

import { Link } from 'react-router-dom'
import moment from "moment"

const ReceiptDetail = (props) => {
  const [receipt, setReceipt] = useState(null)

  const getReceiptDetail = id => {
    ReceiptDataService.getDetail(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setReceipt(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const receiptId = props.match.params.id
    if (receiptId) {
      getReceiptDetail(receiptId)
    }
  }, [])

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          {receipt ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">RECEIPT DETAILS</CardTitle>
                <Button type='button' color='secondary' outline tag={Link} to='/supplier/receipts'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>RECEIPT NO</Label>
                      <Col sm='8'>
                        <Input value={receipt.PTHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={`${receipt.PRHFCY_0} (${receipt.FCYNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>RECEIPT DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(receipt.RCPDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CURRENCY</Label>
                      <Col sm='8'>
                        <Input value={receipt.CUR_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>SUPPLIER</Label>
                      <Col sm='8'>
                        <Input value={receipt.BPSNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>NAME</Label>
                      <Col sm='8'>
                        <Input value={receipt.BPONAM_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { receipt.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            <th className="no-wrap">PRE RECEIPT #</th>
                            <th className="no-wrap">PO NUMBER</th>
                            {/* <th className="no-wrap">LINE NO</th> */}
                            <th className="no-wrap">PRODUCT</th>
                            <th className="no-wrap">DESCRIPTION</th>
                            <th className="no-wrap">QTY</th>
                            <th className="no-wrap">WEIGHT</th>
                            <th className="no-wrap">VOLUME</th>
                            <th className="no-wrap">NET PRICE</th>
                            <th className="no-wrap text-right">LINE AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { receipt.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.PTHNUM_0}</td>
                                <td>{item.POHNUM_0}</td>
                                {/* <td>{item.PTDLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES_0}</td>
                                <td>{item.QTYUOM_0}</td>
                                <td>{item.QTYWEU_0}</td>
                                <td>{item.QTYVOU_0}</td>
                                <td>{item.NETPRI_0}</td>
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

export default ReceiptDetail
