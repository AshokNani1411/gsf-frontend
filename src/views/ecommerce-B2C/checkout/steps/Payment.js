// ** Third Party Components
import { PlusCircle, Check } from 'react-feather'
import { Form, Label, Input, Button, Card, CardHeader, CardTitle, CardBody, CardText, CustomInput } from 'reactstrap'

import { useEffect, useRef, useState, Fragment } from 'react'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

const ToastContent = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='warning' icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>Warning!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)



const Payment = (props) => {

 const [totalPrice, setTotalPrice] = useState(0)
     const [isAccepted, setIsAccepted] = useState(false)
 const [totalQty, setTotalQty] = useState(0)
const summaryOptions  = () => {
        let tq = 0, tp = 0
          props.products?.map((cart) => {
              let temptotalprice = 0
              temptotalprice =   Number(cart.QTY_0) * Number(cart.XPRICE_0)
              tq = tq + Number(cart.QTY_0)
              tp = tp + temptotalprice

          })
            setTotalPrice(tp)
            setTotalQty(tq)

    }

    useEffect(() => {

                   summaryOptions()


         }, [props])

  const onAcceptTerms = (isAccept) => {
          setIsAccepted(isAccept)
        }

      const onProceedToPay = () => {

             if (!isAccepted) {
                   toast.warning(
                     <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
                     { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                   )
                 } else {
       }
       }

  return (
    <Form
      className='list-view product-checkout'
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <div className='payment-type'>
        <Card>
          <CardHeader className='flex-column align-items-start'>
            <CardTitle tag='h4'>Payment options</CardTitle>
            <CardText className='text-muted mt-25'>Be sure to click on correct payment option</CardText>
          </CardHeader>
          <CardBody>
            <h6 className='card-holder-name my-75'>John Doe</h6>
            <CustomInput
              id='card'
              type='radio'
              defaultChecked
              label='US Unlocked Debit Card 12XX XXXX XXXX 0000'
              name='paymentMethod'
            />
            <div className='customer-cvv mt-1'>
              <div className='form-inline'>
                <Label className='mb-50' for='card-holder-cvv'>
                  Enter CVV:
                </Label>
                <Input className='input-cvv ml-sm-75 ml-0 mb-50' id='card-holder-cvv' />
                <Button className='btn-cvv ml-0 ml-sm-1 mb-50' color='primary'>
                  Continue
                </Button>
              </div>
            </div>
            <hr className='my-2' />
            <ul className='other-payment-options list-unstyled'>
              <li className='py-50'>
                <CustomInput type='radio' label='Credit / Debit / ATM Card' name='paymentMethod' id='payment-card' />
              </li>
              <li className='py-50'>
                <CustomInput type='radio' label='Net Banking' name='paymentMethod' id='payment-net-banking' />
              </li>
              <li className='py-50'>
                <CustomInput type='radio' label='EMI (Easy Installment)' name='paymentMethod' id='payment-emi' />
              </li>
              <li className='py-50'>
                <CustomInput type='radio' label='Cash On Delivery' name='paymentMethod' id='payment-cod' />
              </li>
            </ul>
            <hr className='my-2' />
            <div className='gift-card mb-25'>
              <CardText>
                <PlusCircle className='mr-50' size={21} />
                <span className='align-middle'>Add Gift Card</span>
              </CardText>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className='amount-payable checkout-options'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>Price Details</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className='list-unstyled price-details'>
              <li className='price-detail'>
                <div className='details-title'>Price of {props.products.length} items</div>
                <div className='detail-amt'>
                  <strong>${Number(totalPrice).toFixed(2)}</strong>
                </div>
              </li>
              <li className='price-detail'>
                <div className='details-title'>Delivery Charges</div>
                <div className='detail-amt discount-amt text-success'>Free</div>
              </li>
            </ul>
            <hr />
            <ul className='list-unstyled price-details'>
              <li className='price-detail'>
                <div className='details-title'>Amount Payable</div>
                <div className='detail-amt font-weight-bolder'>${Number(totalPrice).toFixed(2)}</div>
              </li>
            </ul>
            <hr />
                             <div className='alert-body'>
                                <ul className="m-0 pl-1">
                                 <li>Once Order confirmed, can't be modified</li>
                                 <li>Please cross check products and quantity before Confirmation</li>
                                 <li>Delivery Address is same as the Customer address shown in the User Info application.</li>
                                </ul>
                              </div>
                           <hr />
                             <CustomInput inline
                                                                                      type='checkbox'
                                                                                      id='exampleCustomCheckbox2'
                                                                                      label='I accept the above Terms & Conditions'
                                                                                      onChange={(e) => onAcceptTerms(e.target.checked)}
                                                                                    />
                            <hr />
            <Button.Ripple
                color='primary'
                classnames='btn-next place-order'
                block

               onClick={() => onProceedToPay()}
              >
                Pay Now
              </Button.Ripple>
          </CardBody>
        </Card>
      </div>
    </Form>
  )
}

export default Payment
