import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, FormGroup, Label, Input } from 'reactstrap'
import QuoteService from "../../services/QuoteService"
import { Link } from 'react-router-dom'
import moment from "moment"

const QuoteDetail = (props) => {
  const [quote, setQuote] = useState(null)

  const getQuoteDetail = id => {
    QuoteService.getQuoteDetail(id)
      .then(response => {
        if (response && response.data && response.data.length > 0) {
          setQuote(response.data[0])
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    const orderId = props.match.params.id
    if (orderId) {
      getQuoteDetail(orderId)
    }
  }, [])

  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          {quote ? (
          <div>
            <Card>
              <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h4' className="mb-0">SALES QUOTE DETAILS</CardTitle>
                <Button style={{backgroundColor : "#217f69", color : "white"}} type='button' color='secondary' outline tag={Link} to='/customer/quotes'>Back</Button>
              </CardHeader>
              <CardBody>
                <Row className='mt-2'>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>QUOTE NUMBER</Label>
                      <Col sm='8'>
                        <Input value={quote.SQHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>SITE</Label>
                      <Col sm='8'>
                        <Input value={`${quote.SALFCY_0} (${quote.FCYNAM_0})`} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>REFERENCE</Label>
                      <Col sm='8'>
                        <Input value={quote.CUSQUOREF_0} disabled/>
                      </Col>
                    </FormGroup>

                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>ORDER DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(quote.ORDDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>QUOTE DATE</Label>
                      <Col sm='8'>
                      <Input value={moment(quote.QUODAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>

                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>QUOTE TYPE</Label>
                      <Col sm='8'>
                        <Input value={quote.SQHTYP_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>CURRENCY</Label>
                      <Col sm='8'>
                        <Input value={quote.CUR_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { quote.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            {/* <th>LINE NUMBER</th> */}
                            <th>PRODUCT</th>
                            <th>DESCRIPTION</th>
                            <th>QUOTED QTY</th>
                            <th className='text-right'>PRICE</th>
                            {/* <th>DELIVERED QTY</th> */}
                            <th className='text-right'>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          { quote.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                {/* <td>{item.SOPLIN_0}</td> */}
                                <td><strong className="text-dark">{item.ITMREF_0}</strong></td>
                                <td>{item.ITMDES_0}</td>
                                <td>{item.QTY_0} {item.SAU_0}</td>
                                <td className='text-right'>{item.GROPRI_0} {quote.CUR_0}</td>
                                {/* <td>{item.DLVQTY_0}</td> */}
                                <td className='text-right'>{Number(item.GROPRI_0) * Number(item.QTY_0)} {quote.CUR_0}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table> : <p className="text-center mb-0">No data found</p> }
                    </div>
                  </Col>
                </Row>
                 <Row>
                                  <Col sm='8'>
                                  </Col>
                              <Col sm='4' className="mt-2">
                                                                                                             <FormGroup row>
                                                                                                                                   <Label sm='4'><strong>TOTAL AMOUNT </strong></Label>
                                                                                                                                   <Col sm='8'>
                                                                                                                                      <Input className='text-right' value={`${quote.QUOINVATI_0} ${quote.CUR_0}`} disabled/>
                                                                                                                                   </Col>
                                                                                                                                 </FormGroup>

                                                                                                            </Col>
                                             <Col md={12}>
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

export default QuoteDetail
