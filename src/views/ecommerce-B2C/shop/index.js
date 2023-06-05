// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'


// API calls
import getAllPrice from '../../../services/ProductPriceService'
import { retrieveProducts } from "../../../redux/actions/product"
import { retrieveProductPrice } from "../../../redux/actions/product-price"
import { retrieveDropRequests, deleteDropRequest, createSOCartRequest, deleteSOCartRequest, retrievesSOCartRequests } from "../../../redux/actions/drop-request"
import { retrieveProductCategories } from "../../../redux/actions/product-categories"

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from '../store/actions'

// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import { ChevronDown, Edit, Trash2, X, Check } from 'react-feather'
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


const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
const [searchValue, setSearchValue] = useState('')
const [selectPrdCateg, setSelectPrdCateg] = useState('')
  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  // API

  const user = JSON.parse(localStorage.getItem('userData'))
  const products = useSelector(state => state.products)
   // const [tempprdoucts , setTempproducts] = useState()
    const shoppingList = useSelector(state => state.soCart)
    const productsPrice = useSelector(state => state.productsPrice)
    const productCategories = useSelector(state => state.productCategories)

 const callAPIs = () => {

    dispatch(retrieveProducts(user.X3SITE_0))
    dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
    dispatch(retrieveProductCategories(user.X3SITE_0))
    dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
  //    dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, '', ''))

  }



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


  // ** Get products
  useEffect(() => {
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    )
  }, [dispatch])


 const handleFilter = e => {
    console.log("Inisde handlefilter", e)
    const value = e.target.value
     console.log("Inisde handlefilter", value)
   // let updatedData = []
   if (value.length > 0) {
      console.log("Inisde handlefilter if", value)
   setSearchValue(value)
   }

  }

  const handleFilterProdCateg = e => {
       console.log("Inisde prod categ filter", e)
    setSelectPrdCateg(e)
  }


  return (
    <Fragment>
      <Products
        store={store}
        dispatch={dispatch}
        addToCart={addToCart}
        activeView={activeView}
        ProdcutCateg = {productCategories}
        shoppingList = {shoppingList}
        getProducts={getProducts}
        ProductsList={products}
        productsPrice = {productsPrice}
        sidebarOpen={sidebarOpen}
        getCartItems={getCartItems}
        setActiveView={setActiveView}
        addToWishlist={addToWishlist}
        setSidebarOpen={setSidebarOpen}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
        onSearch={handleFilter}
        searchValue={searchValue}
        categoryValue = {productCategories}
        selectPrdCateg = {selectPrdCateg}
        addProducttoCart = {addProducttoCart}
      />
      <Sidebar sidebarOpen={sidebarOpen}
      ProdcutCateg = {productCategories}
      onProdCategChange = {handleFilterProdCateg}
      selectPrdCateg = {selectPrdCateg}
                 />
    </Fragment>
  )
}
export default Shop
