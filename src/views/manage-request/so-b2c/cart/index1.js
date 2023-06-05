
import { retrievesSOCartRequests } from "../../../../redux/actions/drop-request/index"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

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
import { ChevronDown, X } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, Table, FormGroup } from 'reactstrap'

const tempShoppingCartData = {
                              products: [
                                             {
                                               id: 59,
                                               title: "Dramm Backpack Sprayer",
                                               price: 20.0,
                                               quantity: 3,
                                               total: 60,
                                               discountPercentage: 8.71,
                                               discountedPrice: 55
                                             },
                                             {
                                                                                            id: 59,
                                                                                            title: "ALUMINUM5",
                                                                                            price: 20,
                                                                                            quantity: 3,
                                                                                            total: 60,
                                                                                            discountPercentage: 8.71,
                                                                                            discountedPrice: 55
                                                                                          },
                                          {
                                                                                         id: 59,
                                                                                         title: "Pox Vaccinator",
                                                                                         price: 20,
                                                                                         quantity: 3,
                                                                                         total: 60,
                                                                                         discountPercentage: 8.71,
                                                                                         discountedPrice: 55
                                                                                       },
                                          {
                                                                                         id: 59,
                                                                                         title: "Digital Hanging Scale",
                                                                                         price: 20,
                                                                                         quantity: 3,
                                                                                         total: 60,
                                                                                         discountPercentage: 8.71,
                                                                                         discountedPrice: 55
                                                                                       }


                                           ],
                                           total: 2328,
                                           discountedTotal: 1941,
                                           userId: 97,
                                           totalProducts: 5,
                                           totalQuantity: 10
                                         }


function ShoppingCart() {

  const dispatch = useDispatch()
 const soCart = useSelector(state => state.soCart)
  const [selectAddress, setSelectAddress] = useState(null)
   const [selectCarrier, setSelectCarrier] = useState(null)
   const [selectDeliveryMode, setSelectDeliveryMode] = useState(null)
    const user = JSON.parse(localStorage.getItem('userData'))

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

  const setAddress = event => {

    setSelectAddress(event)
    setDropRequest({ ...dropRequest, ['address']: event ? event.value : '' })
  }

  const setCarrier = event => {
   setSelectCarrier(event)
    setDropRequest({ ...dropRequest, ['carrier']: event ? event.value : '' })
  }

  const setDeliveryMode = event => {
    setSelectDeliveryMode(event)
    setDropRequest({ ...dropRequest, ['delivery_mode']: event ? event.value : '' })
  }

 const columns = [
       {
          name: 'Product ',
          selector: 'ITMDES_0',
          sortable: true,
          minWidth: '50px'
        },
    {
      name: 'Quantity',
      selector: 'QTY_0',
      sortable: true,
      minWidth: '30px'

      },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
      minWidth: '150px'
    },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
      minWidth: '50px'
    }
  ]


   return (
    <div className="w-100">
         <Row>
           <Col sm='12'>
             <Card>
               <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                 <CardTitle tag='h4' style={{fontSize:"24px", fontWeight : "700"}}>My Cart</CardTitle>
                 {/* <Button.Ripple color='primary' tag={Link} to='/invoices/create'>
                     Add New Invoice Request
                 </Button.Ripple> */}
               </CardHeader>
               <Row >
                 <Col md={7}>

               <DataTable
                 noHeader
                 data={soCart}
                 columns={columns}
                 className='react-dataTable'
                 sortIcon={<ChevronDown size={10} />}
               />

               </Col>
                <Col md={4}>
                   <div className="summaryCart">
                     <h4> Summary </h4>
                     <h3>No of Products: {tempShoppingCartData.totalProducts}</h3>
                      <h3>Total Price: {tempShoppingCartData.total}</h3>

                   </div>
                </Col>
                </Row>
                <hr />
                 <h4>Ship To</h4>
                 <hr />
                               <Row>
                                <Col md={7}>
                               <div className="cartMandatory">
                                   <div className="cartMandatory-item">
                                     <Label for='address'>Address <span className='text-danger'>*</span></Label>
                                     <Select
                                       id='address'
                                       theme={selectThemeColors}
                                       classNamePrefix='select'
                                       name='address'
                                       placeholder='Select Address'
                                       options={addressOptions}
                                       isClearable
                                       value={selectAddress}
                                       onChange={setAddress}
                                     />
                                   </div>

                                   <div className="cartMandatory-item">
                                     <Label for='carrier'>Carrier <span className='text-danger'>*</span></Label>
                                     <Select
                                       id='carrier'
                                       theme={selectThemeColors}
                                       classNamePrefix='select'
                                       name='carrier'
                                       placeholder='Select Carrier'
                                       options={carrierOptions}
                                       isClearable
                                       value={selectCarrier}
                                       onChange={setCarrier}
                                      />
                                   </div>
                                  <div className="cartMandatory-item">
                                     <Label for='deliverymode'>Delivery Method <span className='text-danger'>*</span></Label>
                                     <Select
                                       id='deliverymode'
                                       theme={selectThemeColors}
                                       classNamePrefix='select'
                                       name='delivery_mode'
                                       placeholder='Select Delivery Method'
                                       options={deliveryModeOptions}
                                       isClearable
                                       value={selectDeliveryMode}
                                       onChange={setDeliveryMode}
                                     />
                                   </div>
                                    <div >
                                                         <Label for='date'>Date <span className='text-danger'>*</span></Label>
                                                        <Input
                                                                                                                   name='date'
                                                                                                                   id='date'
                                                                                                                   value=''
                                                                                                                   onChange={handleInputChange}
                                                                                                                 />


                                                       </div>
                                                      <div>
                                                         <Label for='reference'>Reference</Label>
                                                         <Input
                                                           name='reference'
                                                           id='reference'
                                                           value=''
                                                           onChange={handleInputChange}
                                                           />
                                                       </div>

                                 </div>
                                 </Col>
                               </Row>

                <Row style={{justifyContent : "flex-end"}}>
                    <Col md='2' lg='2' className='mt-1 d-flex'>
                         <Button type='submit' outline tag={Link} to='/customer/payment/pay' style={{marginBottom : "20px"}}  color='primary'>
                                                                            CheckOut
                                                                          </Button>
                              </Col>
                           </Row>
                 <Row className='justify-content-between mx-0'>
                 </Row>
             </Card>
           </Col>
           </Row>
               </div>

   )
}
export default ShoppingCart
