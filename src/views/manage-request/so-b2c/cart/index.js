
import {
MDBBtn,
MDBCard,
MDBCardBody,
MDBCardHeader,
MDBCardImage,
MDBCol,
MDBContainer,
MDBIcon,
MDBInput,
MDBListGroup,
MDBListGroupItem,
MDBRipple,
MDBRow,
MDBTooltip,
MDBTypography
} from "mdb-react-ui-kit"
import '../salesordercreation.css'
import { retrievesSOCartRequests } from "../../../../redux/actions/drop-request/index"
import { createDropRequest, createSOCartRequest, deleteSOCartRequest} from "../../../../redux/actions/drop-request"
import { useEffect, useRef, useState, Fragment } from 'react'
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment'
import { useForm, Controller } from 'react-hook-form'
import Moment from 'react-moment'
import { Link, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import classnames from 'classnames'
import { retrieveProducts } from "../../../../redux/actions/product"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../../../redux/actions/common"
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, X, Check, Plus, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup, CustomInput, Alert  } from 'reactstrap'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'
import PaymentDetails from '../../../payments/paymentList'

const ToastContent = ({header, message, color}) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>{header}!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)


function ShoppingCart() {
  const dispatch = useDispatch()
 const soCart = useSelector(state => state.soCart)
  const [selectAddress, setSelectAddress] = useState(null)
   const [selectCarrier, setSelectCarrier] = useState(null)
   const [selectDeliveryMode, setSelectDeliveryMode] = useState(null)
   const [totalPrice, setTotalPrice] = useState(0)
    const [totalQty, setTotalQty] = useState(0)
     const [isAccepted, setIsAccepted] = useState(false)
     const [isDecremented, setIsDecremented] = useState(false)
      const [isProceedToPay, setIsProceedToPay] = useState(true)
    const user = JSON.parse(localStorage.getItem('userData'))
const prevAddress = useRef()
const prevDeliveryModes = useRef()
const prevCarrier = useRef()
const prevSOCart = useRef()

  const emptyProduct = {
    id: '',
    product_code: '',
    description: '',
    sau: '',
    price: '',
    quantity: '',
    line_amount: ''
  }

     const history = useHistory()
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

  const refComp = useRef(null)

 const { register, errors, handleSubmit, control, setValue } = useForm({
    defaultValues: initialState
  })

  const addresses = useSelector(state => state.addresses)
  const addressOptions = addresses?.map(a => {
    return {value: a.BPAADD_0, label: `${a.BPAADD_0} (${a.BPADES_0})`, flg: a.BPAADDFLG_0, defCarrier: a.BPTNUM_0, defMdl: a.MDL_0}
  })

  const carriers = useSelector(state => state.carriers)
  const carrierOptions = carriers?.map(c => {
    return {value: c.BPTNUM_0, label: `${c.BPTNUM_0} (${c.BPTNAM_0})`}
  })

  const deliveryModes = useSelector(state => state.deliveryModes)
  const deliveryModeOptions = deliveryModes?.map(d => {
    return {value: d.MDL_0, label: `${d.MDL_0} (${d.TEXTE_0})`}
  })
 const [isSubmitted, setSubmitted] = useState(false)

  const increaseAttachmentCount = () => {
    setAttachmentCount(attachmentcount + 1)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setDropRequest({ ...dropRequest, [name]: value })
  }

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

    const addressOptionsafter = () => {
                 const defaultdetails = addressOptions.filter((a) => a.flg === 2)
                     console.log("default details are", defaultdetails)
                     let a, c, m
                     if (defaultdetails.length > 0) {
                           a = defaultdetails
                           c = carrierOptions.filter((a) => a.value === defaultdetails[0].defCarrier)
                           m = deliveryModeOptions.filter((a) => a.value === defaultdetails[0].defMdl)
                     }
          setDropRequest({ ...dropRequest, ['address']: a && a.length > 0 ? a[0].value : '', ['carrier']: c && c.length > 0 ? c[0].value : '', ['delivery_mode']: m && m.length > 0 ? m[0].value : '' })
                    console.log("a =", a)
                    console.log("c =", c)
                    console.log("m =", m)
                     setSelectAddress(a)
                     setSelectCarrier(c)
                     setSelectDeliveryMode(m)
            }

     const updateProduct = index => (event) => {
          const selectedProduct = products.find(p => p.ITMREF_0 === event.value)
          const tempProducts = dropRequest.products.map((product, pIndex) => {
            if (pIndex === index) {
              return {...product, product_code: event.value, description: selectedProduct.ITMDES1_0, price : selectedProduct.BASPRI_0,  sau: selectedProduct.SAU_0}
            }
            return product
          })
          setDropRequest({...dropRequest, products: tempProducts})
        }

    const summaryOptions  = () => {
        let tq = 0, tp = 0
          soCart?.map((cart) => {
              let temptotalprice = 0
              temptotalprice =   Number(cart.QTY_0) * Number(cart.XPRICE_0)
              tq = tq + Number(cart.QTY_0)
              tp = tp + temptotalprice

          })
            setTotalPrice(tp)
            setTotalQty(tq)

      setDropRequest({
          ...dropRequest,
          products: soCart.map(product => ({
              id: '',
              product_code: product.ITMREF_0,
              description: product.ITMDES_0,
              sau: 'UN',
              price: product.XPRICE_0,
              quantity: product.QTY_0,
              line_amount: Number(product.XPRICE_0) * Number(product.QTY_0)
          }))
          })
    }

      const onAcceptTerms = (isAccept) => {
        setIsAccepted(isAccept)
      }


  useEffect(() => {
          if (addresses !== prevAddress.current ||
              deliveryModes !== prevDeliveryModes.current || carriers !== prevCarrier.current || soCart !== prevSOCart.current) {
                prevAddress.current = addresses
                prevDeliveryModes.current = deliveryModes
                prevCarrier.current = carriers
                prevSOCart.current = soCart
               addressOptionsafter()
               console.log("insdie useeffect")
               summaryOptions()

           }

     }, [addresses, deliveryModes, carriers, soCart])

useEffect(() => {
    if (user) {
      dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
      console.log("so cart data", soCart)
    }

      dispatch(retrieveProducts(user.X3SITE_0))
        dispatch(retrieveAddresses(user.X3USER_0, 'customer'))
        dispatch(retrieveCarriers())
        dispatch(retrieveDeliveryModes())

      //  setSelectAddress(addressOptions.filter((a) => a.flg === 2))
        const defaultdetails = addressOptions.filter((a) => a.flg === 2)
         console.log("default details are", defaultdetails)
         if (defaultdetails.length > 0) {
             setSelectAddress(defaultdetails)
             setSelectCarrier(carrierOptions.filter((a) => a.value === defaultdetails[0].defCarrier))
             setSelectDeliveryMode(deliveryModeOptions.filter((a) => a.value === defaultdetails[0].defMdl))
         }
  }, [])


  const handleDecrement = (prd, i) => {

      console.log("decrement - prd", prd)
      const updatedQty = Number(prd.QTY_0) - 1
      const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
     console.log("decrement - param", params)
          dispatch(createSOCartRequest(params))
                      .then(data => {
                           dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                        toast.success(

                          <ToastContent header='Success' message={`${props.item.ITMREF_0} quantity is updated`} color='success' />,
                          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                        )
                        setIsDecremented(true)
                      //  dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                      })
                      .catch(e => {
                        console.log(e)
                      })


  }

  const handleIncrement = (prd, i) => {
       console.log("increment - prd", prd)
            const updatedQty = Number(prd.QTY_0) + 1
                const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
               console.log("INCRE - param", params)
                    dispatch(createSOCartRequest(params))
                                .then(data => {
                                 dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                                  toast.success(

                                    <ToastContent header='Success' message={`${props.item.ITMREF_0} quantity is updated`} color='success' />,
                                    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                  )

                                })
                                .catch(e => {
                                  console.log(e)
                                })


    }

    const DeleteProductfromCart = (prd, i) => {

         const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0}
          console.log("delete", params)
                        dispatch(deleteSOCartRequest(params))
                                    .then(data => {
                                         dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                                      toast.success(
                                        <ToastContent header='Success' message={`${prd.ITMREF_0} Removed from Cart`} color='success' />,
                                        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                      )
                                    })
                                    .catch(e => {
                                      console.log(e)
                                    })


    }

  const setAddress = event => {
     console.log("New address", event)
      console.log("def drop Request", dropRequest)
    setSelectAddress(event)
    setDropRequest({ ...dropRequest, ['address']: event ? event.value : '' })
     console.log("New address i", selectAddress)
  }

  const setCarrier = event => {
   setSelectCarrier(event)
    setDropRequest({ ...dropRequest, ['carrier']: event ? event.value : '' })
  }

  const setDeliveryMode = event => {
    setSelectDeliveryMode(event)
    setDropRequest({ ...dropRequest, ['delivery_mode']: event ? event.value : '' })
  }


const   onProceedToPay = () => {
 setSubmitted(true)
      console.log("at submit - address =", selectAddress)
      console.log("at submit - address length", dropRequest)
    //   console.log("at submit - address length", selectAddress[0].value)
      if (!isAccepted) {
        toast.warning(
          <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
      if (isAccepted) {

          setIsProceedToPay(false)
      }
}


const returnToCart = () => {
      setIsProceedToPay(true)
       setSubmitted(false)
      setIsAccepted(false)
}


  const onSubmit = () => {
        console.log("onSubmit =")
      setSubmitted(true)
      console.log("at submit - address =", selectAddress)
      console.log("at submit - address length", dropRequest)
    //   console.log("at submit - address length", selectAddress[0].value)
      if (!isAccepted) {
        toast.warning(
          <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
      if (isAccepted) {
        let  totalAmt = 0
        let totalQty = 0
         dropRequest.products.map(p => {
                  totalAmt += p.line_amount
                  totalQty += Number(p.quantity)
                })
                const params = {...dropRequest, total_amt: totalAmt, total_qty: totalQty, address: selectAddress && selectAddress.length > 0 ? selectAddress[0].value : '', carrier: selectCarrier && selectCarrier.length > 0 ? selectCarrier[0].value : '', delivery_mode: selectDeliveryMode && selectDeliveryMode.length > 0 ? selectDeliveryMode[0].value : ''}
        console.log("Drop Request at submit after =", params)

        dispatch(createDropRequest(params))
          .then(data => {
            history.push('/customer/manage-request/drop-request')
            toast.success(
              <ToastContent header='Success' message={data.message} color='success' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          })

          .catch(e => {
            console.log(e)
          })
      }
    }
    console.log("address loading", addresses)
   return (
    <div className="w-100">
     {isProceedToPay ?
         <Row>
           <Col sm='12'>
             <Card>
               <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                <CardTitle tag='h2' style={{fontSize : "26px", fontWeight : "600"}}>My Cart</CardTitle>
                 <Button.Ripple color='primary' tag={Link} to='/customer/order/create'>
                                Continue Shopping
                  </Button.Ripple>
                 {/* <Button.Ripple color='primary' tag={Link} to='/invoices/create'>
                     Add New Invoice Request
                 </Button.Ripple> */}
               </CardHeader>
                 <MDBRow className="justify-content-center my-2">

                     <MDBCol md="8" className="socart-productList">
                        {soCart  && soCart.length > 0 && soCart.map((prd, i) => (
                       <MDBCard className="shoppingCartPrdCard mb-0">
                         <MDBCardBody>
                                     <MDBRow>
                                       <MDBCol lg="5" md="5" className=" mb-0 mb-lg-0">
                                         <h3>
                                           <strong>{prd.ITMDES_0}</strong>
                                         </h3>
                                       </MDBCol>
                                       <MDBCol lg="1" md="1" className="mb-0 mb-lg-0">
                                         <strong>${Number(prd.XPRICE_0).toFixed(2)}</strong>
                                       </MDBCol>
                                       <MDBCol lg="2" md="2" className="mr-2 mb-lg-0">
                                            <div class="input-group">
                                                        <button type="button" onClick={() => handleDecrement(prd, i)} disabled={prd.QTY_0 < 2} className="input-group-text"> - </button>
                                                         <div className="form-control text-center">{prd.QTY_0}</div>
                                                        <button type="button" onClick={() => handleIncrement(prd, i)} className="input-group-text"> + </button>
                                            </div>
                                       </MDBCol>
                                       <MDBCol lg="1" md="1" className="mb-0 mb-lg-0">
                                                                                <strong>${(Number(prd.XPRICE_0) * Number(prd.QTY_0)).toFixed(2)}</strong>
                                                                              </MDBCol>
                                       <MDBCol >
                                                  <button onClick={() => DeleteProductfromCart(prd, i)} type="button" class="btn btn-danger btn-floating">
                                                    Remove
                                                  </button>
                                        </MDBCol>
                                     </MDBRow>

                                     <hr className="my-1" />
                                   </MDBCardBody>
                                 </MDBCard>
                                 ))
                          }
                <div className="shipToAddress mt-5">
                <h4>Ship To</h4>
                <hr className='mt-0' />
                <Row ml-1>
                       <div style={{    width: "100%",
                                        margin: "5px",
                                        height: "200px",
                                        overflowX: "auto"}}>
                                          <div className="grid">
                       { addresses && addresses.length > 0 && addresses.map((address) =>  (

<label className="gridcard">
    <input name="plan" className="gridradio" type="radio" checked />

    <span className="grid-plan-details">
      <span className="grid-plan-type">{address.BPADES_0}</span>
      <span>{address.BPAADDLIG_0}</span>
      <span>{address.BPAADDLIG_1}</span>
      <span>{address.CTY_0} - {address.POSCOD_0}</span>
      <span>{address.SAT_0} - {address.CRYNAM_0}</span>
      <span>{address.TEL_0} -</span>
    </span>
  </label>


  ))
  }
  </div>

                                      </div>

                </Row>
                  <hr className='mt-0' />
                <Row ml-1>
                                  <Col md='4' sm='12'>


                      <FormGroup>
                                            <Label for='date'>Date <span className='text-danger'>*</span></Label>
                                            <Controller
                                              id='date'
                                              control={control}
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
                                        <Col md='4' sm='12'>
                                          <FormGroup>
                                            <Label for='reference'>Reference</Label>
                                            <Input
                                              name='reference'
                                              id='reference'
                                              value={dropRequest && dropRequest.reference}
                                              onChange={handleInputChange}
                                              className={classnames({ 'is-invalid': errors['reference'] })}
                                              innerRef={register({ required: true, validate: value => value !== '' })}
                                            />
                                          </FormGroup>
                                        </Col>
                                  <Col md={6}>
                                                     <FormGroup>
                                                       <Label for='comment'>Comment</Label>
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
                     </div>
                    </MDBCol>
                       <MDBCol md="4">
                            <MDBCard className="summartfromCart mb-4">
                              <MDBCardHeader>
                                <MDBTypography block tag="h5" className="mb-0">
                                  <strong style={{fontSize:"24px"}}>Summary</strong>
                                </MDBTypography>
                              </MDBCardHeader>
                              <hr />
                              <MDBCardBody>
                                <MDBListGroup flush>
                                  <MDBListGroupItem
                                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-0">
                                    <div style={{fontSize:"20px"}}>
                                      Total Amount
                                    </div>
                                    <span>
                                      <strong style={{fontSize:"20px"}}>{Number(totalPrice).toFixed(2)} USD</strong>
                                    </span>
                                  </MDBListGroupItem>


<MDBListGroupItem
                                    className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                    <div style={{fontSize:"20px"}}>
                                      Total Quantity

                                    </div>
                                    <span>
                                      <strong style={{fontSize:"20px"}}>{totalQty} UN</strong>
                                    </span>
                                  </MDBListGroupItem>

                                </MDBListGroup>
                               <MDBListGroup>
                                  <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                 <Alert color='secondary'>
                                 <div className='alert-body'>
                                                        <ul className="m-0 pl-1">
                                                          <li>Once Order confirmed, can't be modified</li>
                                                          <li>Please cross check products and quantity before Confirmation</li>
                                                          <li>Delivery Address is same as the Customer address shown in the User Info application.</li>
                                                        </ul>
                                                      </div>
                                    </Alert>
                                  </MDBListGroupItem>
                                   <MDBListGroupItem>
                                                     <FormGroup>
                                                       <CustomInput inline
                                                         type='checkbox'
                                                         id='exampleCustomCheckbox2'
                                                         label='I accept the above Terms & Conditions'
                                                         onChange={(e) => onAcceptTerms(e.target.checked)}
                                                       />
                                                     </FormGroup>


                                </MDBListGroupItem>
                                </MDBListGroup>

                                <MDBBtn block size="lg" style={{height: '50px'}}  onClick={() => onProceedToPay()}>
                                  PROCEED TO PAY
                                </MDBBtn>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>

                </MDBRow>

                           <hr className="my-4" />

             </Card>
           </Col>
           </Row>
           :
           <PaymentDetails
                 totalPayAmount = {totalPrice}
                 currency = {'USD'}
                 returnInvoice = {returnToCart}
                 />
           }
               </div>

   )
}
export default ShoppingCart
