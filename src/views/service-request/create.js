// ** React Imports
import { useState, useEffect, Fragment, useRef } from 'react'
import Repeater from '@components/repeater'
import { Check, Plus, Trash2 } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

import { useDispatch, useSelector } from "react-redux"
import { retrieveProductConsumptions } from "../../redux/actions/product-consumption"
import { retrieveInstallBase } from "../../redux/actions/install-base"


import { createServiceRequest } from "../../redux/actions/service-request"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../redux/actions/common"

// ** Third Party Components
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, CardBody, Form, FormGroup, TabContent, TabPane, Nav, NavItem, NavLink, CustomInput, Alert } from 'reactstrap'

import Avatar from '@components/avatar'

import { useForm, Controller } from 'react-hook-form'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'
import { Link, useHistory } from 'react-router-dom'

import ServiceRequestDataService from "../../services/ServiceRequestService"
import classnames from 'classnames'
import moment from 'moment'
import { toast, Slide } from 'react-toastify'

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

const CreateServiceRequestComponent = (props) => {
  const productConsumptions = useSelector(state => state.productConsumptions)

  const productOptions = productConsumptions && productConsumptions.map(p => {
    return {value: p.ITMREF_0, label: `${p.ITMREF_0} (${p.ITMDES1_0})`, category : p.HDKITMTYP_0}
  })
const prevAddress = useRef()
const prevProductConsumptions = useRef()
const prevInstallBase = useRef()

const isMounted = useRef(false)

const addresses = useSelector(state => state.addresses)

  const addressOptions = addresses?.map(a => {
     console.log("Tzzz inside addressOptions")
    return {value: a.BPAADD_0, label: `${a.BPAADD_0} (${a.BPADES_0})`, flg: a.BPAADDFLG_0, defCarrier: a.BPTNUM_0, defMdl: a.MDL_0}
  })



 const installbases = useSelector(state => state.installbases)
   const installBaseOptions = installbases?.map(c => {
      console.log("inside loop install base", c)
     return {value: c.MACNUM_0, label: `${c.MACNUM_0} (${c.MACDES_0})`}
   })


    const type = {
      "040" : { title: 'Maintenace', color: 'light-info' },
      "010": { title: 'Installation', color: 'light-danger' },
      "020": { title: 'Training', color: 'light-success' },
      "030": { title: 'Repair', color: 'light-warning' },
      A1 : { title: 'CAll', color: 'light-info' },
      B1: { title: 'At Third PArty Site', color: 'light-danger' },
      C1 : { title: 'To Truck to Workshop', color: 'light-success' }
    }

  const categOptions = [
     { label: "010 - Installation", value: "Installation" },
     { label: "020 - Training", value: "Training" },
     { label: "030 - Repair", value: "Repair" },
     { label: "040 - Maintance", value: "Maintance" },
     { label: "B1 - At Third Party Site", value: "At Third Party Site" },
     { label: "C1 - To Truck to Workshop", value: "To Truck to Workshop" },
      { label: "A1 - Call", value: "Call" }
 ]


 const status = {
    0: { title: 'To Confirm', color: 'light-info' },
    1: { title: 'To Submit', color: 'light-primary' },
    2: { title: 'Submited to Technician', color: 'light-dark' },
    3: { title: 'In - Progress', color: 'light-success' },
    4: { title: 'On the Way', color: 'light-info' },
    5: { title: 'Skipped', color: 'light-danger' },
    6 : {title : 'Delivered', color : 'light-success'}
  }


  const consumptionTypeOptions = [
      { label: "Part", value: 2 },
      { label: "Labour", value: 3 },
       { label: "Expense", value: 4 }

  ]


  // ** State
  const [count, setCount] = useState(1)
  const [attachmentcount, setAttachmentCount] = useState(1)
   const [selectAddress, setSelectAddress] = useState(null)
   const [selectCateg, setSelectCateg] = useState(null)
   const [selectCarrier, setSelectCarrier] = useState(null)
   const [filteredProductData, setFilteredProductData] = useState([])
   const [selectProductCateg, setSelectProductCateg] = useState(null)
   const [selectDeliveryMode, setSelectDeliveryMode] = useState(null)
  const [active, setActive] = useState('1')
  const [totPrice, setTotPrice] = useState(0)
  const [totQty, setTotQty] = useState(0)
  const [totPriceUN, setTotPriceUN] = useState('')
    const [totQtyUN, setTotQtyUN] = useState('')
  const [isAccepted, setIsAccepted] = useState(false)
   const [iscategselected, setiscategselected] = useState(false)
  const user = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const history = useHistory()

  const emptyProduct = {
    id: '',
    Consumption: '',
    ConsumptionType : '',
    Consumptiondescription: '',
   ProviderName : '',
   InstallBase : '',
   ConusmptionNumber : '',
    Unit: '',
    AmountConsumption: '',
    Quanitity: '',
    line_amount: ''
  }

  const initialState = {
    id: '',
    site: `${user.X3SITE_0} (${user.FCYNAM_0})`,
    date: new Date(),
    reference: '',
    customer: `${user.X3USER_0} (${user.XNAME_0})`,
    currency: user.CUR_0,
    status: 'To Confirm',
    drop_type: 'Service Request',
    categ : '',
    comment: '',
    address: '',
    carrier: '',
    delivery_mode: '',
    products: [emptyProduct]
  }

  const [dropRequest, setDropRequest] = useState(initialState)

  const increaseCount = () => {

    const tempProductsList = dropRequest.products
    let qtyflag = true
    tempProductsList.map((product, pIndex) => {
                   if (qtyflag)  {
                   console.log("T111 insdie prdocut ", product)
                    console.log("T111 insdie pIndex ", pIndex)
                    if (product.quantity > 0) {
                      qtyflag = true
                    } else {
                      qtyflag = false
                    }
                   }
                   })
     if (qtyflag) {
      setCount(count + 1)
          console.log("on Add New click", dropRequest.products)
          dropRequest.products.push(emptyProduct)
     }  else {

        toast.warning(
               <ToastContent header='Error' message='Quantity cant be zero' color='danger' />,
               { transition: Slide, hideProgressBar: true, autoClose: 2000 }
             )
     }

  }

  const { register, errors, handleSubmit, control, setValue } = useForm({
    defaultValues: initialState
  })

  const getDropRequestDetail = id => {
    ServiceRequestDataService.get(id)
      .then(response => {
        setDropRequest({
          id: response.data.SRENUM_0,
          site: `${user.X3SITE_0} (${user.FCYNAM_0})`,
          date: new Date(response.data.SRERESDAT_0),
          reference: response.data.TEXTE_0,
          customer: `${user.X3USER_0} (${user.XNAME_0})`,
          currency: response.data.CUR_0,
          status: response.data.XSTATUS_0,
          drop_type: 'Request',
          comment: response.data.XCOMMENT_0,
          address: response.data.BPAADD_0,
          categ : `${response.data.XTYP_0}  (${response.data.TEXTE_0})`,

         products: response.data.products
        })
        setValue('date', new Date(response.data.SRERESDAT_0))
       //setValue('products[0].product_code', response.data.products[0].product_code)
        setCount(response.data.products.length)
      })
      .catch(e => {
        console.log(e)
      })

      console.log("after getDropRequest", dropRequest)
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


useEffect(() => {

  dispatch(retrieveProductConsumptions(user.X3SITE_0))
  dispatch(retrieveInstallBase(user.X3SITE_0))
   dispatch(retrieveAddresses(user.X3USER_0, 'customer'))
    const dropReqId = props.match.params.id
    if (dropReqId) {
      getDropRequestDetail(dropReqId)
    }

    isMounted.current = true
    return () => { isMounted.current = false }
}, [])


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





   const setCategory = event => {
     console.log("inside SetCategory", event)
      setSelectCateg(event)
      setDropRequest({ ...dropRequest, ['categ']: event ? event.value : '' })
    }

const setprodCategory = event => {

   setiscategselected(true)
        let updatedData = []
       setSelectProductCateg(event)
       console.log("TT e value", event)
       console.log("TT product optons", productOptions)
       updatedData = productOptions && productOptions.filter(
       (product) => {
          return product.category === event.value
          })
          setFilteredProductData(updatedData)

   // setDropRequest({ ...dropRequest, ['delivery_mode']: event ? event.value : '' })
  }



   const updateConsTYpe = index => (event) => {
      console.log("seleted cons type", event)

      const tempConsumptions = dropRequest.products.map((product, pIndex) => {
        console.log("seleted prodcut", product)

        if (pIndex === index) {
          return {...product, product_categ: event.value}
        }
        return product
      })
      setDropRequest({...dropRequest, products: tempConsumptions})

       setiscategselected(true)
              let updatedData = []
             setSelectProductCateg(event)
             console.log("TT e value", event)
             console.log("TT product optons", productOptions)
             updatedData = productOptions && productOptions.filter(
             (product) => {
                return product.category === event.value
                })
                setFilteredProductData(updatedData)
    }



  const updateProductCateg = index => (event) => {
    console.log("update prod categ- index", index)
    console.log("update prod categ- event", event)
    const tempProducts = dropRequest.products.map((product, pIndex) => {
      if (pIndex === index) {
        return {...product, product_categ: event.value}
      }
      return product
    })
    setDropRequest({...dropRequest, products: tempProducts})

     setiscategselected(true)
            let updatedData = []
           setSelectProductCateg(event)
           console.log("TT e value", event)
           console.log("TT product optons", productOptions)
           updatedData = productOptions && productOptions.filter(
           (product) => {
              return product.category === event.value
              })
              setFilteredProductData(updatedData)
  }

  const onPriceChange = index => event => {

    const tempProducts = dropRequest.products.map((product, pIndex) => {
     console.log("T11 price change")
      if (pIndex === index) {
        console.log("T11 price change i", pIndex)
       CalculateQtyandPrice(index, event, 'price')
        return {...product, price: event.target.value, line_amount: product.quantity > 0 ? event.target.value * product.quantity : 0}
      }
      return product
    })
    setDropRequest({...dropRequest, products: tempProducts})
  }


  const onQtyChange = index => event => {
     console.log("T11 Qty change")
    const tempProducts = dropRequest.products.map((product, pIndex) => {

      if (pIndex === index) {
        console.log("T11 price change i", pIndex)
        CalculateQtyandPrice(index, event, 'qty')
        return {...product, quantity: event.target.value, line_amount: product.price > 0 ? event.target.value * product.price : 0}
      }
      return product
    })
    setDropRequest({...dropRequest, products: tempProducts})
  }

  const deleteForm = index => (e) => {
    e.preventDefault()
    const tempProducts =  dropRequest.products.filter((p, pIndex) => pIndex !== index)
    setDropRequest({...dropRequest, products: tempProducts})
    setCount(count - 1)
    CalculateQtyandPrice(index, e, 'delete')
  }

  const onAcceptTerms = (isAccept) => {
    setIsAccepted(isAccept)
  }

  const onSubmit = () => {
    setSubmitted(true)
    if (!isAccepted) {
      toast.warning(
        <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
        { transition: Slide, hideProgressBar: true, autoClose: 2000 }
      )
    }
    if (isObjEmpty(errors) && isAccepted && dropRequest.address && dropRequest.carrier && dropRequest.delivery_mode) {
      let totalAmt = 0
      let totalQty = 0
      dropRequest.products.map(p => {
        totalAmt += p.line_amount
        totalQty += Number(p.quantity)
      })
      const params = {...dropRequest, total_amt: totalAmt, total_qty: totalQty}
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


   useEffect(() => {
         console.log("inside useeffect 2")
            console.log("inside useeffect 2 - installbase", installbases)
              console.log("inside useeffect 2 - prevInstallBase", prevInstallBase.current)
               console.log("inside useeffect 2")
          if (installbases !== prevInstallBase.current || productConsumptions !== prevProductConsumptions.current || addresses !== prevAddress.current) {
              //  prevAddress.current = addresses
               console.log("inside useeffect 3")
                prevInstallBase.current = installbases
                prevProductConsumptions.current = productConsumptions
                 prevAddress.current = addresses
              // addressOptionsafter()
           }

     }, [installbases, productConsumptions, addresses])

  console.log("install base", installbases)
  console.log("drop request details are ", dropRequest)
  return (
    <div className="w-100">
      <Row>
        <Col sm='12'>
          <Card>
            <CardHeader className='border-bottom'>
              <CardTitle tag='h4'>CREATE SERVICE REQUEST</CardTitle>
            </CardHeader>
            <CardBody className="pt-1">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='site'>Site</Label>
                      <Input
                        name='site'
                        id='site'
                        value={dropRequest.site}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
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
                            value={dropRequest.date}
                            onChange={(date) => setDropRequest({...dropRequest, ['date']:moment(new Date(date)).format('YYYY-MM-DD') })}
                            options={{
                              dateFormat: 'm-d-Y'

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
                      <Label for='reference'>Request Number</Label>
                      <Input
                        name='reference'
                        id='reference'
                        value={dropRequest && dropRequest.id}
                        onChange={handleInputChange}
                        className={classnames({ 'is-invalid': errors['reference'] })}
                        innerRef={register({ required: true, validate: value => value !== '' })}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='customer'>Customer</Label>
                      <Input
                        name='customer'
                        id='customer'
                        value={dropRequest.user}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                      <Label for='status'>Status</Label>
                      <Input
                        name='status'
                        id='status'
                        value={status[dropRequest.status] && status[dropRequest.status].title}
                        readOnly
                        innerRef={register}
                      />
                    </FormGroup>
                  </Col>
                  <Col md='4' sm='12'>
                    <FormGroup>
                                          <Label for='categ'>Category <span className='text-danger'>*</span></Label>
                                          <Select
                                            id='categ'
                                            theme={selectThemeColors}
                                            classNamePrefix='select'
                                            name='categ'
                                            placeholder='Select Category'
                                            options={categOptions}
                                            isClearable
                                           value={categOptions.find(c => c.value === dropRequest.categ)}
                                            onChange={setCategory}
                                            className={classnames('react-select', { 'is-invalid': isSubmitted && dropRequest.categ === '' })}
                                            innerRef={register({ required: true, validate: value => value !== '' })}
                                          />
                                        </FormGroup>
                  </Col>
                   <Col md='4' sm='12'>
                                      <FormGroup>
                                        <Label for='address'>Address <span className='text-danger'>*</span></Label>
                                        <Select
                                          id='address'
                                          theme={selectThemeColors}
                                          classNamePrefix='select'
                                          name='address'
                                          placeholder='Select Address'
                                          isClearable
                                           value={addressOptions.find(c => c.value === dropRequest.address)}
                                           className={classnames('react-select', { 'is-invalid': isSubmitted && dropRequest.address === '' })}
                                          innerRef={register({ required: true, validate: value => value !== '' })}
                                        />
                                      </FormGroup>
                                    </Col>
                </Row>


                <hr />
                <Row>

                  <Col md={6}>
                    <FormGroup>
                                         <Label for='reference'>Title</Label>
                                         <Input
                                           name='title'
                                           id='title'
                                           value={dropRequest && dropRequest.reference}
                                           onChange={handleInputChange}
                                           className={classnames({ 'is-invalid': errors['reference'] })}
                                           innerRef={register({ required: true, validate: value => value !== '' })}
                                         />
                                       </FormGroup>
                    <FormGroup>
                      <Label for='comment'>Description</Label>
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
                  <Col md={12}>
                                    </Col>
                </Row>
                 <hr className='mt-0' />
                                <div className='d-flex justify-content-between align-items-center'>
                                  <h4 className='mb-0'>Consumptions</h4>
                                  <Button.Ripple className='btn-icon' color='primary' onClick={increaseCount}>
                                    <Plus size={14} />
                                    <span className='align-middle ml-25'>Add New</span>
                                  </Button.Ripple>
                                </div>
                                <hr />
                                <Repeater count={count}>
                                  {i => {
                                     console.log("product details", dropRequest.products[i])
                                    const Tag = i === 0 ? 'div' : SlideDown
                                    const fieldName = `products[${i}]`
                                    console.log("field name =", fieldName)
                                    return (
                                      <div id={`product-${i}`} key={i}>
                                        <fieldset name={fieldName} key={fieldName}>
                                          <Tag key={i}>
                                            <Row className='justify-content-between align-items-center'>
                                               <Col md='2' sm='12'>
                                                                                <FormGroup>
                                                                                    <Label for={`animation-product-categ-${i}`}>Base</Label>
                                                                                   <Controller
                                                                                                                      id={`animation-product-categ-${i}`}
                                                                                                                      control={control}
                                                                                                                      defaultValue={dropRequest.products[i] ? dropRequest.products[i].InstallBase : ''}
                                                                                                                      name={`${fieldName}.InstallBase`}
                                                                                                                      render={({value, name, ref}) => (
                                                                                                                        <Select
                                                                                                                          inputRef={ref}
                                                                                                                          isClearable
                                                                                                                          options={installBaseOptions}
                                                                                                                          onChange={updateProductCateg(i)}
                                                                                                                        value={installBaseOptions.find(c => c.value === dropRequest.products[i].InstallBase)}

                                                                                                                          placeholder='Select Base'
                                                                                                                          className={classnames('react-select', { 'is-invalid': errors['products'] && errors['products'][i].InstallBase })}
                                                                                                                          classNamePrefix='select'
                                                                                                                          theme={selectThemeColors}
                                                                                                                        />
                                                                                                                      )}
                                                                                                                    />
                                                                                </FormGroup>
                                               </Col>
                                               <Col md={2}>
                                                                                               <FormGroup>
                                                                                                  <Label for={`animation-consumption-type-${i}`}>Consumption Type</Label>
                                                                                                                                                  <Controller
                                                                                                                                                    id={`animation-consumption-type-${i}`}
                                                                                                                                                    control={control}
                                                                                                                                                    defaultValue={dropRequest.products[i] ? dropRequest.products[i].consumptionType : ''}
                                                                                                                                                    name={`${fieldName}.consumptionType`}
                                                                                                                                                    render={({value, name, ref}) => (
                                                                                                                                                      <Select
                                                                                                                                                        inputRef={ref}
                                                                                                                                                        isClearable
                                                                                                                                                        options={consumptionTypeOptions}
                                                                                                                                                        onChange={updateConsTYpe(i)}
                                                                                                                                                        value={consumptionTypeOptions.find(c => c.value === dropRequest.products[i].consumptionType)}
                                                                                                                                                        placeholder='Choose Consumption'
                                                                                                                                                        className={classnames('react-select', { 'is-invalid': errors['products'] && errors['products'][i].consumptionType })}
                                                                                                                                                        classNamePrefix='select'
                                                                                                                                                        theme={selectThemeColors}
                                                                                                                                                      />
                                                                                                                                                    )}
                                                                                                                                                  />

                                                                                               </FormGroup>
                                                                                             </Col>
                                              <Col md={2}>
                                                <FormGroup>
                                                  <Label for={`animation-product-code-${i}`}>Consumption</Label>
                                                  <Controller
                                                    id={`animation-product-code-${i}`}
                                                    control={control}
                                                    defaultValue={dropRequest.products[i] ? dropRequest.products[i].Consumption : ''}
                                                    name={`${fieldName}.Consumption`}
                                                    render={({value, name, ref}) => (
                                                      <Select
                                                        inputRef={ref}
                                                        isClearable
                                                        options={  iscategselected ? filteredProductData : productOptions}
                                                        value={productOptions && productOptions.find(c => c.value === dropRequest.products[i].Consumption)}
                                                        placeholder='Choose Consumption'
                                                        className={classnames('react-select', { 'is-invalid': errors['products'] && errors['products'][i].product_code })}
                                                        classNamePrefix='select'
                                                        theme={selectThemeColors}
                                                      />
                                                    )}
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col md={2}>
                                                <FormGroup>
                                                  <Label for={`animation-description-${i}`}>Description</Label>
                                                  <Input
                                                    type='text'
                                                    id={`animation-description-${i}`}
                                                    name={`${fieldName}.Consumptiondescription`}
                                                    value={dropRequest.products[i] ? dropRequest.products[i].Consumptiondescription : ''}
                                                    readOnly
                                                    innerRef={register}
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col md={1}>
                                                <FormGroup>
                                                  <Label for={`animation-price-${i}`}>Price</Label>
                                                  <Input
                                                    type='number'
                                                    id={`animation-price-${i}`}
                                                    placeholder='0.00'
                                                    value={dropRequest.products[i] ? dropRequest.products[i].AmountConsumption : ''}
                                                    name={`${fieldName}.AmountConsumption`}
                                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                                    className={classnames({ 'is-invalid': errors['products'] && errors['products'][i].AmountConsumption })}
                                                    onChange={onPriceChange(i)}
                                                  />
                                                </FormGroup>
                                              </Col>
                                              <Col md={1}>
                                                <FormGroup>
                                                  <Label for={`animation-quantity-${i}`}>Quantity</Label>
                                                  <Input
                                                    type='number'
                                                    id={`animation-quantity-${i}`}
                                                    placeholder='0'
                                                    name={`${fieldName}.Quanitity`}
                                                    value={dropRequest.products[i] ? dropRequest.products[i].Quanitity : ''}
                                                    className={classnames({ 'is-invalid': errors['products'] && errors['products'][i].Quanitity })}
                                                    innerRef={register({ required: true, validate: value => value !== '' })}
                                                    onChange={onQtyChange(i)}
                                                  />
                                                </FormGroup>
                                              </Col>
                                               <Col md={1}>
                                                                              <FormGroup>
                                                                                <Label for={`animation-uom-${i}`}>UOM</Label>
                                                                                <Input
                                                                                  id={`animation-uom-${i}`}
                                                                                  name={`${fieldName}.Unit`}
                                                                                  value={dropRequest.products[i] ? dropRequest.products[i].Unit : ''}
                                                                                  innerRef={register}
                                                                                  readOnly
                                                                                />
                                                                              </FormGroup>
                                                                            </Col>
                                              <Col md={1}>
                                                <Button.Ripple className='btn-icon rounded-circle' color='flat-danger' onClick={deleteForm(i)}>
                                                  <Trash2 size={16} />
                                                </Button.Ripple>
                                              </Col>
                                              <Col sm={12}>
                                                <hr />
                                              </Col>
                                            </Row>
                                          </Tag>
                                        </fieldset>
                                      </div>
                                    )
                                  }}
                                </Repeater>

                <hr />
                <Button type='submit' onClick={() => setSubmitted(true)} className='mr-1' color='primary'>
                  Submit
                </Button>
                <Button type='reset' color='secondary' outline tag={Link} to='/customer/service-request'>
                  Cancel
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CreateServiceRequestComponent
