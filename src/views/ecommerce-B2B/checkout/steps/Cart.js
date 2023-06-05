// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState, Fragment } from 'react'
// ** Third Party Components
import classnames from 'classnames'
import { X, Heart, Star, Check } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge, InputGroup, CustomInput, InputGroupAddon, Input, InputGroupText } from 'reactstrap'
import { createDropRequest, createSOCartRequest, deleteSOCartRequest} from "../../../../redux/actions/drop-request"
// ** Custom Components
import NumberInput from '@components/number-input'

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



const Cart = props => {
  // ** Props
  const { products, stepper, deleteCartItem, dispatch, addToWishlist, deleteWishlistItem, getCartItems, productList } = props
 const user = JSON.parse(localStorage.getItem('userData'))
  // ** Function to convert Date
    const [isAccepted, setIsAccepted] = useState(false)
     const [totalPrice, setTotalPrice] = useState(0)
        const [totalQty, setTotalQty] = useState(0)

  const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
    if (!value) return value
    return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
  }

  // ** Funciton Function to toggle wishlist item
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getCartItems())
  }

       const onAcceptTerms = (isAccept) => {
          setIsAccepted(isAccept)
        }

  const getProductImage = (item) => {

    console.log("prodcut list =", props.productsPrice)
     let image = ''
     { props.productsPrice.map((prd) => {
         if (prd.O_XITM === item.ITMREF_0) {
                  image = prd.O_XITMIMG
              }

         }) }

    return (
       <Link to={`/customer/ecommerce/product/${item.ITMREF_0}`}>
                    <img className='img-fluid' src={`data:image/jpeg;base64,${image}`} alt={item.ITMREF_0} />
                  </Link>
    )
  }

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


const   onProceedToPay = () => {


      if (!isAccepted) {
        toast.warning(
          <ToastContent header='Warning' message='Please accept Terms & Conditions' color='warning' />,
          { transition: Slide, hideProgressBar: true, autoClose: 2000 }
        )
      }
      if (isAccepted) {

          stepper.next()
      }
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
       console.log("increment at cart - prd", prd)
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



  // ** Render cart items
  const renderCart = () => {
    return products.map((item, i) => {
      return (
        <Card key={item.ITMDES_0} className='ecommerce-card'>
          <div className='item-img'>
             {getProductImage(item)}
          </div>
          <CardBody>
            <div className='item-name'>
              <h6 className='mb-0'>
                <Link to={`/customer/ecommerce/product/${item.ITMREF_0}`}>{item.ITMDES_0}</Link>
              </h6>
              <span className='item-company'>

                <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
                  {item.brand}
                </a>
              </span>

            </div>
            <span className='text-success mb-1'>In Stock</span>
            <div className='item-quantity'>
              <span className='quantity-title mr-50'>Qty</span>
              <NumberInput value={item.QTY_0} min={1} max={100} onIncrement={() => props.handleIncrement(item, i)} onDecrement ={() => props.handleDecrement(item, i)}  size='sm' style={{ width: '7rem', height: '2.15rem' }} />
            </div>
            </CardBody>
          <div className='item-options text-center'>
            <div className='item-wrapper'>
              <div className='item-cost'>
                <h4 className='item-price'>${item.XPRICE_0}</h4>
                {item.hasFreeShipping ? (
                  <CardText className='shipping'>
                    <Badge color='light-success' pill>
                      Free Shipping
                    </Badge>
                  </CardText>
                ) : null}
              </div>
            </div>
            <Button className='mt-1 remove-wishlist' color='light' onClick={() => props.DeleteProductfromCart(item, i)}>
              <X size={14} className='mr-25' />
              <span>Remove</span>
            </Button>

          </div>
        </Card>
      )
    })
  }

  return (
    <div className='list-view product-checkout'>
      <div className='checkout-items'>{products.length ? renderCart() : <h4>Your cart is empty</h4>}</div>
      <div className='checkout-options'>
        <Card>
          <CardBody>
            <label className='section-label mb-1'>Summary</label>

            <div className='price-details'>
              <h6 className='price-title'>Price Details</h6>
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title'>Total Amount</div>
                  <div className='detail-amt'>${Number(totalPrice).toFixed(2)}</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Total Quantity</div>
                  <div className='detail-amt discount-amt text-success'>{totalQty} UN</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Discount</div>
                  <div className='detail-amt'>$0</div>
                </li>
                <li className='price-detail'>
                  <div className='detail-title'>Delivery Charges</div>
                  <div className='detail-amt discount-amt text-success'>0</div>
                </li>
              </ul>
              <hr />
              <ul className='list-unstyled'>
                <li className='price-detail'>
                  <div className='detail-title detail-total'>Total Amount Incl Tax</div>
                  <div className='detail-amt font-weight-bolder'>${Number(totalPrice).toFixed(2)}</div>
                </li>
              </ul>
                <hr />
              <Button.Ripple
                color='primary'
                classnames='btn-next place-order'
                block
                disabled={!products.length}
               onClick={() => stepper.next()}
               // onClick={() => onProceedToPay()}
              >
                Place Order
              </Button.Ripple>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Cart
