// ** Utils
import { isObjEmpty } from '@utils'
import { useEffect, useRef, useState, Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { createDropRequest, createSOCartRequest, deleteSOCartRequest} from "../../../../redux/actions/drop-request"
import { useDispatch, useSelector } from "react-redux"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../../../redux/actions/common"
import moment from 'moment'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { useForm, Controller } from 'react-hook-form'
import Alert from '@mui/material/Alert'
import { X, Heart, Star, Check } from 'react-feather'
// ** Third Party Components
import classnames from 'classnames'
import {
  Form,
  Input,
  Card,
  Label,
  FormGroup,
  CardHeader,
  CustomInput,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col
} from 'reactstrap'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

const ToastContent = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>Success </h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)


const Address = props => {
  // ** Props
  const { stepper } = props
   const history = useHistory()
   const dispatch = useDispatch()
     const [isAccepted, setIsAccepted] = useState(false)
 const [selectAddress, setSelectAddress] = useState(null)
 const [selectAddressIndex, setSelectAddressIndex] = useState(0)
  const [selectAddressDetails, setSelectAddressDetails] = useState(null)
   const [selectCarrier, setSelectCarrier] = useState(null)
   const [selectDeliveryMode, setSelectDeliveryMode] = useState(null)
    const user = JSON.parse(localStorage.getItem('userData'))

 const prevAddress = useRef()
 const prevDeliveryModes = useRef()
 const prevCarrier = useRef()
  // ** Vars
   const emptyProduct = {
      id: '',
      product_code: '',
      description: '',
      sau: '',
      price: '',
      quantity: '',
      line_amount: ''
    }



  const { register, errors, handleSubmit, trigger, control, setValue } = useForm()
const initialState = {
       id: '',
       site: `${user.X3SITE_0} (${user.FCYNAM_0})`,
       date: new Date(),
       reference: '',
       customer: `${user.X3USER_0} (${user.XNAME_0})`,
       currency: user.CUR_0,
       status: 'To Confirm',
       drop_type: 'Sales',
       comment: '',
       address: '',
       carrier: '',
       delivery_mode: '',
      products: [emptyProduct]
     }

     const [dropRequest, setDropRequest] = useState(initialState)


  const addresses = useSelector(state => state.addresses)
  const addressOptions = addresses?.map(a => {
    return {value: a.BPAADD_0, label: `${a.BPAADD_0} (${a.BPADES_0})`}
  })

  const carriers = useSelector(state => state.carriers)
  const carrierOptions = carriers?.map(c => {
    return {value: c.BPTNUM_0, label: `${c.BPTNUM_0} (${c.BPTNAM_0})`}
  })

    const handleInputChange = event => {
      const { name, value } = event.target
      setDropRequest({ ...dropRequest, [name]: value })
    }

  const deliveryModes = useSelector(state => state.deliveryModes)
  const deliveryModeOptions = deliveryModes?.map(d => {
    return {value: d.MDL_0, label: `${d.MDL_0} (${d.TEXTE_0})`}
  })
 const [isSubmitted, setSubmitted] = useState(false)



  const summaryOptions  = () => {

      setDropRequest({
          ...dropRequest,
          products: props.products.map(product => ({
              id: '',
              product_code: product.ITMREF_0,
              description: product.ITMDES_0,
              sau: 'UN',
              price: product.XPRICE_0,
              quantity: product.QTY_0,
              line_amount: Number(product.XPRICE_0) * Number(product.QTY_0)
          })),
          ['address']: addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPAADD_0 : '',
            ['carrier']: addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPTNUM_0 : '',
            ['delivery_mode']: addresses && addresses.length > 0 ? addresses[selectAddressIndex].MDL_0 : ''
          })
    }

useEffect(() => {
        dispatch(retrieveAddresses(user.X3USER_0, 'customer'))
        dispatch(retrieveCarriers())
        dispatch(retrieveDeliveryModes())

         }, [])

useEffect(() => {
    console.log("Inside useeffect props")
    summaryOptions()
}, [props])


const handleAddressChange = (e) => {
  setSelectAddress(e.target.value)
   let addressID = '', dlvymode = '', carrieropt = ''
  for (let i = 0; i < addresses.length; i++) {
        console.log("looping", i)
      if (addresses[i].BPADES_0 === e.target.value) {
          console.log(i)
           setSelectAddressIndex(i)
           addressID = addresses[i].BPAADD_0 !== null ? addresses[i].BPAADD_0 : ''
            dlvymode = addresses[i].MDL_0 !== null ? addresses[i].MDL_0 : ''
             carrieropt = addresses[i].BPTNUM_0 !== null ? addresses[i].BPTNUM_0 : ''
      }

  }

 setDropRequest({ ...dropRequest, ['address']: e ? addressID : '', ['carrier']: carrieropt, ['delivery_mode']: dlvymode  })


}

  const onAcceptTerms = (isAccept) => {
          setIsAccepted(isAccept)
        }

const initailLoad = () => {
 setDropRequest({ ...dropRequest,
 ['address']: addresses[selectAddressIndex].BPAADD_0,
  ['carrier']: addresses[selectAddressIndex].BPTNUM_0,
  ['delivery_mode']:  addresses[selectAddressIndex].MDL_0  })

}

  // ** On form submit if there are no errors then go to next step
 /*
  const onSubmit = () => {
    trigger()
    if (isObjEmpty(errors)) {
      stepper.next()
    }
  }
*/

    const onSubmit = () => {

         if (!isAccepted) {
               toast.warning(
                 <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
                 { transition: Slide, hideProgressBar: true, autoClose: 2000 }
               )
             } else {
          console.log("onSubmit =")
        setSubmitted(true)
        console.log("at submit - address =", selectAddress)
        console.log("at submit - address length", dropRequest)
      //   console.log("at submit - address length", selectAddress[0].value)

          let  totalAmt = 0
          let totalQty = 0
           dropRequest.products.map(p => {
                    totalAmt += p.line_amount
                    totalQty += Number(p.quantity)
                  })
                  const params = {...dropRequest, total_amt: totalAmt, total_qty: totalQty}
          console.log("Drop Request at submit after =", params)



          dispatch(createDropRequest(params))
            .then(data => {
              console.log("data after response= ", data)
              toast.success(
                <ToastContent header='Success' message={data.message} color='success' />,
                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
                 history.push('/customer/ecommerceB2B/shop')
            })

            .catch(e => {
              console.log(e)
            })
        }
        }



console.log("address options =", addressOptions)
console.log("load options =", dropRequest)
  return (
    <Form className='list-view product-checkout' onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className='flex-column align-items-start'>
          <CardTitle tag='h4'>Choose Shipping Address</CardTitle>
          <CardText className='text-muted mt-25'>
            Be sure to check "Deliver to this address" when you have finished
          </CardText>
        </CardHeader>
        <CardBody>
          <Row>
          <Col md='6' sm='12'>
                        <FormGroup className='mb-2'>
                          <Label for='add-type'>Choose Address :</Label>
                          <Input type='select' name='add-type' id='add-type' onChange={handleAddressChange} value={selectAddress} key={selectAddress}>
                           {addresses && addresses.map((item, i) => (
                            <option value={item.BPADES_0} >{item.BPADES_0}</option>
                           ))}
                          </Input>
                        </FormGroup>
                      </Col>

            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-name'>Full Name:</Label>
                <Input
                  name='checkout-name'
                  id='checkout-name'
                  placeholder= {user.XNAME_0}
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-name'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-number'>Address 1:</Label>
                <Input
                  type='text'
                  name='checkout-number'
                  id='checkout-number'
                  placeholder= {addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPAADDLIG_0 : ''}
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-number'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-apt-number'>Address 2 :</Label>
                <Input
                  type='number'
                  name='checkout-apt-number'
                  id='checkout-apt-number'
                  placeholder={addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPAADDLIG_1 : ''}
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-apt-number'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-city'>City:</Label>
                <Input
                  name='checkout-city'
                  id='checkout-city'
                  placeholder= {addresses && addresses.length > 0 ? addresses[selectAddressIndex].CTY_0 : ''}

                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-city'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-pincode'>POSTAL:</Label>
                <Input
                  type='number'
                  name='checkout-pincode'
                  id='checkout-pincode'
                 placeholder= {addresses && addresses.length > 0 ? addresses[selectAddressIndex].POSCOD_0 : ''}
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-pincode'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
              <FormGroup className='mb-2'>
                <Label for='checkout-state'>State:</Label>
                <Input
                  name='checkout-state'
                  id='checkout-state'
                  placeholder= {addresses && addresses.length > 0 ? addresses[selectAddressIndex].SAT_0 : ''}
                  innerRef={register({ required: true })}
                  className={classnames({ 'is-invalid': errors['checkout-state'] })}
                />
              </FormGroup>
            </Col>
            <Col md='6' sm='12'>
                          <FormGroup className='mb-2'>
                            <Label for='checkout-landmark'>Country</Label>
                            <Input
                              name='checkout-landmark'
                              id='checkout-landmark'
                            placeholder= {addresses && addresses.length > 0 ? addresses[selectAddressIndex].CRYNAM_0 : ''}
                              innerRef={register({ required: true })}
                              className={classnames({ 'is-invalid': errors['checkout-landmark'] })}
                            />
                          </FormGroup>
                        </Col>
            <Col sm='12' md='6'>
            <FormGroup>
                                                        <Label for='date'>Date <span className='text-danger'>*</span></Label>
                                                        <Controller
                                                          id='date'
                                                          control = {control}
                                                          name='date'
                                                          defaultValue={dropRequest.date}
                                                          render={({value, name, ref}) => (
                                                            <Flatpickr
                                                              value={value}
                                                              onChange={(date) => setDropRequest({...dropRequest, ['date']:moment(new Date(date)).format('YYYY-MM-DD') })}
                                                              options={{
                                                                dateFormat: 'm-d-Y',
                                                                minDate: 'today'
                                                              }}
                                                              className={classnames('form-control', {
                                                                'is-invalid': !dropRequest.date
                                                              })}
                                                            />
                                                          )}
                                                        />
                                                      </FormGroup>
                                                    </Col>
                                                   <Col md={6}>
                                                   </Col>
                                                   <Col md={6}>
                                                                 <FormGroup>
                                                                   <Label for='comment'>Add Instructions</Label>
                                                                   <Input
                                                                     type='textarea'
                                                                     name='comment'
                                                                     rows='3'
                                                                     id='comment'
                                                                     value={dropRequest.comment}
                                                                     onChange={handleInputChange}
                                                                     innerRef={register}
                                                                   />
                                                                 </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <div className='customer-card'>
        <Card>
          <CardHeader>
            <CardTitle tag='h4'>Summary</CardTitle>
            <hr />
          </CardHeader>
          <CardBody>
            <CardText><b>Shipping Address </b></CardText>
            <hr />
            <CardText>{user.XNAME_0}</CardText>
            <CardText className='mb-0'>{addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPADES_0 : ''}</CardText>
            <CardText>{addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPAADDLIG_0 : ''}</CardText>
            <CardText>{addresses && addresses.length > 0 ? addresses[selectAddressIndex].BPAADDLIG_1 : ''}</CardText>
            <CardText>{addresses && addresses.length > 0 ? addresses[selectAddressIndex].CTY_0 : ''}</CardText>
            <CardText>{addresses && addresses.length > 0 ? addresses[selectAddressIndex].CRYNAM_0 : ''}</CardText>
            <CardText>{addresses && addresses.length > 0 ? addresses[selectAddressIndex].POSCOD_0 : ''}</CardText>

            <hr />

            <CardText> <b>Delivery Date : </b>  {dropRequest && dropRequest.date !== undefined ? moment(dropRequest.date).format('MM-DD-YYYY') : '222'}</CardText>
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
              block
              type='button'
              color='primary'
              onClick={() => onSubmit()}
              className='btn-next delivery-address mt-2'
            >
              Generate Order Request
            </Button.Ripple>
          </CardBody>
        </Card>
      </div>
    </Form>
  )
}

export default Address
