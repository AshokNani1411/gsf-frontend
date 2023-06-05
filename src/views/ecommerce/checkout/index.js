// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'

// ** Custom Components
import Wizard from '@components/wizard'
import BreadCrumbs from '@components/breadcrumbs'

// ** Steps
import Cart from './steps/Cart'
import Address from './steps/Address'
import Payment from './steps/Payment'

// ** Third Party Components
import { ShoppingCart, Home, CreditCard } from 'react-feather'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, deleteCartItem, deleteWishlistItem, addToWishlist } from '../store/actions'

import { retrieveProducts } from "../../../redux/actions/product"
import { retrieveAddresses, retrieveCarriers, retrieveDeliveryModes } from "../../../redux/actions/common"
import { createDropRequest, createSOCartRequest, deleteSOCartRequest} from "../../../redux/actions/drop-request"
// ** Styles
import '@styles/base/pages/app-ecommerce.scss'

const Checkout = () => {
  // ** Ref & State
  const ref = useRef(null)
  const [stepper, setStepper] = useState(null)

 const soCart = useSelector(state => state.soCart)
  const [totalPrice, setTotalPrice] = useState(0)
     const [totalQty, setTotalQty] = useState(0)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

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
          getCartItems={getCartItems}
          addToWishlist={addToWishlist}
          deleteCartItem={deleteCartItem}
          deleteWishlistItem={deleteWishlistItem}
        />
      )
    },
    {
      id: 'Address',
      title: 'Address',
      subtitle: 'Enter Your Address',
      icon: <Home size={18} />,
      content: <Address stepper={stepper} />
    },
    {
      id: 'payment',
      title: 'Payment',
      subtitle: 'Select Payment Method',
      icon: <CreditCard size={18} />,
      content: <Payment stepper={stepper} />
    }
  ]

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

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle='Checkout' breadCrumbParent='eCommerce' breadCrumbActive='Checkout' />
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
