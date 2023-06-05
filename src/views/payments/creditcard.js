import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Cards from "react-credit-cards"
import "react-credit-cards/es/styles-compiled.css"
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'

const CreditCard = () => {
  const [number, SetNumber] = useState("")
  const [name, SetName] = useState("")
  const [date, SetDate] = useState("")
  const [cvc, SetCvc] = useState("")
  const [focus, SetFocus] = useState("")

  return (
    <Row>

      <Col sm='6' className="mt-1 mr-6">
           <form>
             <div className="row">
               <div className="col-sm-11">
                 <label for="name">Card Number</label>
                 <input
                   type="text"
                   className="form-control"
                   value={number}
                   name="number"
                   onChange={(e) => {
                     SetNumber(e.target.value)
                   }}
                   onFocus={(e) => SetFocus(e.target.name)}
                 ></input>
               </div>
             </div>
             <br />
             <div className="row">
               <div className="col-sm-11">
                 <label for="name">Card Name</label>
                 <input
                   type="text"
                   className="form-control"
                   value={name}
                   name="name"
                   onChange={(e) => {
                     SetName(e.target.value)
                   }}
                   onFocus={(e) => SetFocus(e.target.name)}
                 ></input>
               </div>
             </div>
             <br />
             <div className="row">
               <div className="col-sm-6">
                 <label for="name">Expiration Date</label>
                 <input
                   type="text"
                   name="expiry"
                   className="form-control"
                   value={date}
                   onChange={(e) => {
                     SetDate(e.target.value)
                   }}
                   onFocus={(e) => SetFocus(e.target.name)}
                 ></input>
               </div>
               <div className="col-sm-5">
                 <label for="name">CVV</label>
                 <input
                   type="tel"
                   name="cvc"
                   className="card"
                   value={cvc}
                   onChange={(e) => {
                     SetCvc(e.target.value)
                   }}
                   onFocus={(e) => SetFocus(e.target.name)}
                 ></input>
               </div>
             </div>
           </form>
           </Col>

      {/* <div className="rccs__card backcolor"> */}
       <Col sm='5' className="mt-5 mr-1 ml-5">
      <div clasName="rccs__card rccs__card--unknown">
        <Cards
          number={number}
          name={name}
          expiry={date}
          cvc={cvc}
          focused={focus}
        />
      </div>
       </Col>


    </Row>
  )
}
export default CreditCard
