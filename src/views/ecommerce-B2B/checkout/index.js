// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

import { retrievesSOCartRequests } from "../../../redux/actions/drop-request/index"
// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'
import { Link, useHistory } from 'react-router-dom'
// ** Third Party Components

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store/actions'

import { retrieveProducts } from "../../../redux/actions/product"
import { retrieveProductPrice } from "../../../redux/actions/product-price"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../../redux/actions/common"
import { createDropRequest, createSOCartRequest, deleteSOCartRequest} from "../../../redux/actions/drop-request"
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'
import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'
import { ChevronDown, Edit, Trash2, X, Check, ShoppingCart, Home, CreditCard } from 'react-feather'
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


const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

 const soCart = useSelector(state => state.soCart)
 const products = useSelector(state => state.products)
  const productsPrice = useSelector(state => state.productsPrice)
  const [totalPrice, setTotalPrice] = useState(0)
     const [totalQty, setTotalQty] = useState(0)

  const user = JSON.parse(localStorage.getItem('userData'))
  const prevProducts = useRef()
  const prevSOCart = useRef()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)



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


  const handleDecrement = (prd, i) => {

      console.log("decrement - prd", prd)
      const updatedQty = Number(prd.QTY_0) - 1
      const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
     console.log("decrement - param", params)
          dispatch(createSOCartRequest(params))
                      .then(data => {
                           dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                        toast.success(

                          <ToastContent header='Success' message={`${prd.ITMREF_0} quantity is updated`} color='success' />,
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
       console.log("increment at index - prd", prd)
            const updatedQty = Number(prd.QTY_0) + 1
                const params = {...prd, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : updatedQty}
               console.log("INCRE - param", params)
                    dispatch(createSOCartRequest(params))
                                .then(data => {
                                 dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
                                  toast.success(

                                    <ToastContent header='Success' message={`${prd.ITMREF_0} quantity is updated`} color='success' />,
                                    { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                                  )

                                })
                                .catch(e => {
                                  console.log(e)
                                })


    }




  // ** Get Cart Items on mount
  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  const steps = [
    {
      id: 'cart',
      title: 'Cart',
      subtitle: 'Your Cart Items',
      icon: <ShoppingCart size={18} />,
      content: (
        <Cart
          stepper={stepper}
          dispatch={dispatch}
          products={soCart}
          productList = {products}
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
          DeleteProductfromCart = {DeleteProductfromCart}
          handleIncrement = {handleIncrement}
          handleDecrement = {handleDecrement}
          productsPrice = {productsPrice}

        />
      )
    },
    {
      id: 'Address',
      title: 'Address',
      subtitle: 'Enter Your Address',
      icon: <Home size={18} />,
      content: <Address
      stepper={stepper}
      products={soCart}
      />
    }

  ]

  useEffect(() => {


      if (soCart !== prevSOCart.current ||
                   products !== prevProducts.current) {
      if (user) {
        dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
        console.log("so cart data", soCart)
      }

        dispatch(retrieveProducts(user.X3SITE_0))
          dispatch(retrieveAddresses(user.X3USER_0, 'customer'))
          dispatch(retrieveCarriers())
          dispatch(retrieveDeliveryModes())
         dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, '', ''))
          }

    }, [])

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Checkout' breadCrumbParent='eCommerce' breadCrumbActive='Checkout' />
      <Button
                                      color='primary'
                                      className='btn-cart move-cart'
                                      //onClick={() => handleCartBtn(prd)}
                                      tag={Link} to='/customer/ecommerceB2C/shop'
                                      style = {{float : "right"}}
                                    >
                                      <span>Continue Shopping</span>
                                    </Button>
      <Wizard
        ref={ref}
        steps={steps}
        className='checkout-tab-steps'
        instance={el => setStepper(el)}
        options={{
          linear: false
        }}
      />
    </Fragment>
  )
}

export default Checkout
