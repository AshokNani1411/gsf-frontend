// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux"
import { retrieveDropRequests, deleteDropRequest, createSOCartRequest, deleteSOCartRequest, retrievesSOCartRequests } from "../../../redux/actions/drop-request"
import { retrieveProductCategories } from "../../../redux/actions/product-categories"
import Moment from 'react-moment'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import SalesOrderCreateHeader from './header/index'
import SalesOrderCreatePageContent from './pagecontent'
import SearchBox from './header/searchbox'

import './salesordercreation.css'
// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import ReactPaginate from 'react-paginate'
import { ChevronDown, Edit, Trash2, X, Check } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, FormGroup } from 'reactstrap'

import '@styles/react/libs/tables/react-dataTable-component.scss'
import { Link } from 'react-router-dom'
import moment from 'moment'

import getAllPrice from '../../../services/ProductPriceService'
import { retrieveProducts } from "../../../redux/actions/product"
import { retrieveProductPrice } from "../../../redux/actions/product-price"

//import { createSOCartRequest } from "../../../redux/actions/drop-request"

const mySwal = withReactContent(Swal)

const ToastContent = ({ message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h6 className='toast-title font-weight-bold'>Success!</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const SalesOrderRequestComponent = ({ data }) => {
  // ** State
  const [searchValue, setSearchValue] = useState('')
  const [categoryValue, setcategoryValue] = useState('')
  const [selectAddress, setSelectAddress] = useState(null)
  const [selectCarrier, setSelectCarrier] = useState(null)
  const [filteredData, setFilteredData] = useState([])
  const [selectDeliveryMode, setSelectDeliveryMode] = useState(null)
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)

  const products = useSelector(state => state.products)
 // const [tempprdoucts , setTempproducts] = useState()
  const shoppingList = useSelector(state => state.soCart)
  const productsPrice = useSelector(state => state.productsPrice)
  const productCategories = useSelector(state => state.productCategories)

  const user = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const prevSOCart = useRef()
  const prevAddress = useRef()
  const prevDeliveryModes = useRef()
  const prevCarrier = useRef()
  const prevProdprice = useRef()

  const callAPIs = () => {

    dispatch(retrieveProducts(user.X3SITE_0))
    dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
    dispatch(retrieveProductCategories())
  //    dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, '', ''))
    
  }

  useEffect(() => {

    callAPIs()
   // getAllPrice(user.X3SITE_0, '', user.X3USER_0)
    dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, '', ''))

     console.log("in useeffect 81")
    /*
     getDummyProducts().then(res => {
       setProductsData(res.products)
     })
 */
  }, [])

  useEffect(() => {
    console.log("Inside useeffet so cart")
    if (shoppingList !== prevSOCart.current) {
      prevSOCart.current = shoppingList
    }

  }, [shoppingList])

  const addProducttoCart = (item) => {
    console.log("T11 product added-item", item)
    const params = { ...item, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty: 1, ITMREF_0 : item.O_XITM, ITMDES_0: item.O_XITMREF, BASPRI_0 : item.O_XPRICE }
    console.log("T11 product added-", item.ITMREF_0)
    dispatch(createSOCartRequest(params))
      .then(data => {
           callAPIs()
        toast.success(
          <ToastContent header='Success' message={`${item.O_XITMREF} Product added to Cart`} color='success' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .catch(e => {
        console.log(e)
      })

   // message.success(`${props.item.ITMREF_0} has been added to Cart`)

  }
  const handleDecrement = (prd, i, oldqty) => {

    console.log("decrement - prd", prd)
    const updatedQty = Number(oldqty) - 1

    if (updatedQty > 0) {
    const params = { ...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty: updatedQty, ITMREF_0 : prd.O_XITM }
    console.log("decrement - param", params)
    dispatch(createSOCartRequest(params))
      .then(data => {
         callAPIs()
        toast.success(
          <ToastContent header='Success' message={`${prd.O_XITM} quantity is updated`} color='success' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .catch(e => {
        console.log(e)
      })
      } else {
                  const params = {...prd, ITMREF_0: prd.O_XITM, usersite: user.X3SITE_0, loginuser: user.X3USER_0}
                  console.log("delete", params)
                                dispatch(deleteSOCartRequest(params))
                                            .then(data => {
                                                 dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                                              toast.success(
                                                <ToastContent header='Success' message={`${prd.O_XITM} Removed from Cart`} color='success' />,
                                                { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                              )
                                            })
                                            .catch(e => {
                                              console.log(e)
                                            })

              }

  }

  const handleIncrement = (prd, i, oldqty) => {
    console.log("increment - prd", prd)
    const updatedQty = Number(oldqty) + 1
    const params = { ...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty: updatedQty, ITMREF_0 : prd.O_XITM }
    console.log("INCRE - param", params)
    dispatch(createSOCartRequest(params))
      .then(data => {
        callAPIs()
        toast.success(
          <ToastContent header='Success' message={`${prd.O_XITM} quantity is updated`} color='success' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      })
      .catch(e => {
        console.log(e)
      })

  }

  const handleChange = value => {
    console.log("selected category", value)
    setcategoryValue(value?.TCLCOD_0)
  }

  const handleFilter = e => {
    console.log("Inisde handlefilter", e)
    const value = e
    let updatedData = []
    setSearchValue(value)
    if (value.length) {
      updatedData = products && products.filter(product => {
        let isMatch = false
        Object.keys(product).forEach(key => {
          if (product[key] && product[key] !== " " && product[key].toString().toLowerCase().includes(value.toLowerCase())) {
            isMatch = true
          }
        })
        return isMatch
      })
      setSearchValue(value)
    }
  }

console.log("inside products - prices", productsPrice)

  return (
    <div className="w-100">
      <SearchBox
        productCategories={productCategories}
        CartRequest={shoppingList}
        onSearch={handleFilter}
        handleChange={handleChange}

      />

      <SalesOrderCreatePageContent
        addProducttoCart={addProducttoCart}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        ProductsList={products}
        productsPrice = {productsPrice}
        shoppingList={shoppingList}
        filteredData={filteredData}
        searchValue={searchValue}
        categoryValue={categoryValue}


      />
    </div>
  )
}

export default SalesOrderRequestComponent
