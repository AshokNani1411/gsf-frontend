import React, { useState, useEffect } from "react"
import { Row, Col, CardTitle, Button, Card, CardHeader, CardBody, Table, Badge, FormGroup, Label, Input } from 'reactstrap'
import DeliveryDataService from \"../../services/DeliveryService"
import paypall from '@src/assets/images/logo/paypall_img.PNG'
import './paymentstyle.css'
import { Link } from 'react-router-dom'
import CreditCard from './creditcard'
import { Map, Marker, GoogleApiWrapper } from "google-maps-react\"
import moment from "moment"
import Moment from "react-moment"
const PaymentDetails = () => {
 const [selectedCheckBox, setSelectedCheckBox] = useState(null)
 const onValueChange = (event) =>  {
   setSelectedCheckBox(event.target.value)
     }
       return (
          <div className="w-100">
                 <Row>
                   <Col sm='12'>
                             <Card>
                               <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                               <CardTitle tag='h4'>Validate Order</CardTitle>
                                          {/* <Button.Ripple color='primary' tag={Link} to='/invoices/create'>\r\n                     Add New Invoice Request\r\n                 </Button.Ripple> */}\r\n
                                          </CardHeader>
                                           <Row className="terms">
                                           <h4> By paying this proposal, I agree to the following terms: </h4>
                                           </Row>
                                           <Row>
                                           <div className='alert-body'>
                                               <ul className="m-0 pl-1">
                                               <li>Accepted on the behalf of: <b>Stripe </b></li>
                                               <li>For an amount of: <b> $6584 </b></li>
                                               <li>With payment terms: <b> 30 Days </b></li>
                                               </ul>
                                           </div>
                                           </Row>
                                        <Row >
                                          <div className="paywith" >
                                          <h3> <b>Pay with </b> </h3>
                                            </div>
                                        </Row >
                                        <div className="radio">
                                         <div>
                                           <label style={{fontSize:"18px", fontWeight : "600"}}>
                                                  <input  type="radio"
                                                          value="paypall"
                                                          onChange={onValueChange}
                                                          checked={selectedCheckBox === "paypall"}
                                                  />
                                                          PayPal </label>
                                         </div>
                                           <div className="images">
                                            <img src={paypall} style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', maxWidth: '350px'}} />
                                            </div>
                                         </div>
                                         <div className="radio">
                                          <div>
                                                   <label style={{fontSize:"18px", fontWeight : "600"}}>
                                                              <input  type="radio"
                                                                      value="upi"
                                                                      onChange={onValueChange}
                                                                      checked={selectedCheckBox === "upi"}
                                                            />
                                                   Wire Transfer
                                                   </label>
                                           </div>
                                           </div>
                                           <div className="radio">
                                            <label style={{fontSize:"18px", fontWeight : "600"}}>
                                                           <input    type="radio"
                                                                     value="ccard"
                                                                     onChange={onValueChange}
                                                                      checked={selectedCheckBox === "ccard"}
                                                             />  Credit Card
                                            </label>
                                              {           selectedCheckBox === "ccard"  ?
                                              <div className="ccard-app"> <CreditCard /> </div> : ''}
                                               </div>
                                                 <Row style={{justifyContent : "flex-end"}}>
                                                    <Col md='2' lg='2' className='mt-1 d-flex'>
                                                    <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
                                                         Pay & Confirm
                                                    </Button>
                                                    </Col>
                                                      </Row>
                                                        </Card>
                                                          </Col>
                                                             </Row>
                                                               </div>
                                  )}
                                                           export default PaymentDetails