import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, Badge, FormGroup, Label, Input } from 'reactstrap'
import ReceiptDataService from "../../services/ReceiptService"

import { Link } from 'react-router-dom'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react"
import moment from "moment"
import pinDanger from '../../assets/images/icons/pin-danger.png'
import Moment from "react-moment"

const PodDetail = (props) => {
  const [receipt, setReceipt] = useState(null)

  const getReceiptDetail = id => {
    ReceiptDataService.get(id)
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

  const encode = (input) => {
    input = new Uint8Array(input)
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    let output = ""
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0

    while (i < input.length) {
        chr1 = input[i++]
        chr2 = i < input.length ? input[i++] : Number.NaN
        chr3 = i < input.length ? input[i++] : Number.NaN

        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63

        if (isNaN(chr2)) {
            enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
            enc4 = 64
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4)
    }
    return output
  }

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
                      <Label sm='4'>DOCUMENT</Label>
                      <Col sm='8'>
                        <Input value={receipt.XSDHNUM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>BP NAME</Label>
                      <Col sm='8'>
                        <Input value={receipt.BPRNAM_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>UPDATE BY</Label>
                      <Col sm='8'>
                        <Input value={receipt.UPDUSR_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>PICKUP DATE</Label>
                      <Col sm='8'>
                        <Input value={moment(receipt.XDLVDAT_0).format('MM/DD/YYYY')} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>REFERENCE</Label>
                      <Col sm='8'>
                        <Input value={receipt.XPODREF_0} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col md='4'>
                    <FormGroup row>
                      <Label sm='4'>BP CODE</Label>
                      <Col sm='8'>
                        <Input value={receipt.XBPCORD1_0} disabled/>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label sm='4'>LAST UPDATE</Label>
                      <Col sm='8'>
                        <Input value={moment(receipt.UPDDATTIM_0).format('MM/DD/YYYY HH:MM:SS')} disabled/>
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Address</h4>
                    <Row>
                      <Col md='4'>
                        <FormGroup row>
                          <Label sm='4'>SUPPLIER CODE</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPCORD1_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>ADDRESS</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPAADDLIG_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>LINE 2</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPAADDLIG_2} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>LINE 4</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPAADDLIG_4} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>CITY</Label>
                          <Col sm='8'>
                            <Input value={receipt.XCTY_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>PHONE</Label>
                          <Col sm='8'>
                            <Input value={receipt.MOB_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>GPS LONG</Label>
                          <Col sm='8'>
                            <Input value={receipt.XGEOX_0} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                        <FormGroup row>
                          <Label sm='4'>DESCRIPTION</Label>
                          <Col sm='8'>
                            <Input value={receipt.BPRSHO_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>LINE 1</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPAADDLIG_1} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>LINE 3</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPAADDLIG_3} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>ZIP</Label>
                          <Col sm='8'>
                            <Input value={receipt.XPOSCOD_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>COUNTRY</Label>
                          <Col sm='8'>
                            <Input value={receipt.XCRY_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>WEB</Label>
                          <Col sm='8'>
                            <Input value={receipt.WEB_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>GPS LAT</Label>
                          <Col sm='8'>
                            <Input value={receipt.XGEOY_0} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                      <div id="gmaps-markers" className="gmaps h-375" style={{ position: "relative" }}>
                        <Map
                          google={props.google}
                          style={{ width: "100%", height: "100%" }}
                          zoom={6}
                          initialCenter={{ lat: receipt.XGEOY_0, lng: receipt.XGEOX_0 }}>
                            <Marker
                              position={{ lat: receipt.XGEOY_0, lng: receipt.XGEOX_0 }}
                              icon={{
                                url: pinDanger,
                                anchor: new google.maps.Point(32, 32),
                                scaledSize: new google.maps.Size(32, 32)
                              }}
                            />
                          </Map>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Time Tracking</h4>
                    <Row>
                      <Col md='6'>
                        <FormGroup row>
                          <Label sm='4'>ETA DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XETAD_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>ARRIVAL DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XCNFARRD_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>START UNLOADING DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XSTRTUND_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>QTY UPDATE DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XCAPDDD_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>END UNLOADING DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XENDUNLD_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>DEPARTURE DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XCNFDEPD_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>ETD DATE</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XETDD_0).format('MM/DD/YYYY')} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md='6'>
                        <FormGroup row>
                          <Label sm='4'>ETA TIME</Label>
                          <Col sm='8'>
                            <Input value={receipt.XETAT_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>ARRIVAL TIME</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XCNFARRT_0, 'HHmm').format('HH:mm')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>START UNLOADING TIME</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XSTRTUNT_0, 'HHmm').format('HH:mm')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>QTY UPDATE TIME</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XCAPDDT_0, 'HHmm').format('HH:mm')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>END UNLOADING TIME</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XENDUNLT_0, 'HHmm').format('HH:mm')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>DEPARTURE TIME</Label>
                          <Col sm='8'>
                            <Input value={moment(receipt.XCNFDEPT_0, 'HHmm').format('HH:mm')} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>ETD TIME</Label>
                          <Col sm='8'>
                            <Input value={receipt.XETDT_0} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Transportation</h4>
                    <Row>
                      <Col md='4'>
                        <FormGroup row>
                          <Label sm='4'>ROUTE</Label>
                          <Col sm='8'>
                            <Input value={receipt.XVEHROU_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>DRIVER</Label>
                          <Col sm='8'>
                            <Input value={`${receipt.XUSER_0} (${receipt.DRIVER_0})`} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>CARRIER EMAIL</Label>
                          <Col sm='8'>
                            <Input value={receipt.XBPTEMAIL_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>UNIT</Label>
                          <Col sm='8'>
                            <Input value={receipt.XWEU_0} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                        <FormGroup row>
                          <Label sm='4'>SCHEDULE</Label>
                          <Col sm='8'>
                            <Input value={receipt.XDELSCH_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>CARRIER CODE</Label>
                          <Col sm='8'>
                            <Input value={ receipt.XBPTNUMSDH_0 && receipt.XBPTNUMSDH_0 !== " " ? `${receipt.XBPTNUMSDH_0} (${receipt.BPTNAM_0})` : ''} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>GROSS WEIGHT</Label>
                          <Col sm='8'>
                            <Input value={receipt.XGROWEI_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>VOLUME</Label>
                          <Col sm='8'>
                            <Input value={receipt.XVOL_0} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                      <Col md='4'>
                        <FormGroup row>
                          <Label sm='4'>VEHICLE</Label>
                          <Col sm='8'>
                            <Input value={`${receipt.XVEH_0} (${receipt.NAME_0})`} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>NET WEIGHT</Label>
                          <Col sm='8'>
                            <Input value={receipt.XNETWEI_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>UNIT</Label>
                          <Col sm='8'>
                            <Input value={receipt.XVOU_0} disabled/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label sm='4'>NO OF PACKAGES</Label>
                          <Col sm='8'>
                            <Input value={receipt.XPACNBR_0} disabled/>
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">POD Images</h4>
                    <div className="px-2">
                    { receipt.images.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            <th>TYPE</th>
                            <th>DOCUMENT</th>
                            <th>CONTENT</th>
                            <th>POST DATE</th>
                          </tr>
                        </thead>
                        <tbody>
                          { receipt.images.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.CODBLB_0 === "RO" ? 'POD Images' : item.CODBLB_0 === "VANSALES" ? 'Supplier Signature' : '-'}</td>
                                <td>{item.IDENT2_0}</td>
                                <td><img src={`data:image/png;base64,${encode(item.BLOB_0.data)}`} style={{ width: '100px' }} /></td>
                                <td><Moment format="MM/DD/YYYY HH:mm:ss">{item.CREDATTIM_0}</Moment></td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table> : <p className="text-center mb-0">No data found</p>}
                    </div>
                  </Col>
                  <Col sm='12'>
                    <h4 className="bg-light border my-2 p-1">Products</h4>
                    <div className="px-2">
                    { receipt.SORDERQ.length > 0 ? <Table bordered responsive>
                        <thead>
                          <tr>
                            <th>RECEIPT #</th>
                            <th>PRODUCT</th>
                            <th>ORDER QTY</th>
                            <th>DELIVERED QTY</th>
                            <th>UNIT</th>
                            <th>PACKAGES</th>
                            <th>MASS</th>
                            <th>UNIT</th>
                            <th>VOLUME</th>
                            <th>UNIT</th>
                            <th>LEFT QTY TO SHIP</th>
                          </tr>
                        </thead>
                        <tbody>
                          { receipt.SORDERQ.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.XSDHNUM_0}</td>
                                <td><strong className="text-dark">{item.XITMREF_0}</strong></td>
                                <td>{item.XDLVQTY_0}</td>
                                <td>{item.XPODQTY_0}</td>
                                <td>{item.XUNIT_0}</td>
                                <td>{item.XPCK_0}</td>
                                <td>{item.XGROWEI_0}</td>
                                <td>{item.XWEU_0}</td>
                                <td>{item.XVOL_0}</td>
                                <td>{item.XVOU_0}</td>
                                <td>{item.XDLVQTY_0 - item.XPODQTY_0}</td>
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAQb-7NDLDsJh-l3siJQ_1gEw2lBgWKYlU',
  v: "3"
})(PodDetail)
