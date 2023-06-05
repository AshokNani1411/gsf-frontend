// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'
import {
  Row,
  Col,
  CardText,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap'

const Product = props => {
  // ** Props
  const { data, deleteWishlistItem, dispatch, addToWishlist, getProduct, productId, addToCart } = props

 console.log("props data =", props)
  // ** State
  const [selectedColor, setSelectedColor] = useState('primary')




   const getData = (prd) => {

        let mflag = false
        props.shoppingList.map((cart, i) => {
              console.log("Inside ", i)
               console.log("Inside cart ", cart)
            if (cart.ITMREF_0 === prd.O_XITM) {
              mflag = true
            }
        })
         console.log("Inside getDAta", props.shoppingList)
          const CartBtnTag = mflag ? Link : 'button'
       if (mflag) {
            console.log("Inside getDAta matched", prd.O_XITM)

           const tindex = props.shoppingList.findIndex(item => item.ITMREF_0 === prd.O_XITM)
           console.log("Inside tindex=", tindex)

          return (
             <Button
                               color='success'
                               tag= {CartBtnTag}
                              className='btn-cart move-cart'
                              /*eslint-disable */
                              to = '/customer/ecommerceB2B/checkout'

                            >
                              <ShoppingCart className='mr-50' size={14} />
                              <span>View In Cart</span>
                            </Button>
                                                                            )
          } else {
                                  return (
                <Button
                                color='primary'
                                tag = {CartBtnTag}
                                className='btn-cart move-cart'
                                onClick={() => handleCartBtn(prd)}
                              >
                                <ShoppingCart className='mr-50' size={14} />
                                <span>Add To Cart</span>
                              </Button>
                            )
                                                          }
    }





  // ** Renders color options
  const renderColorOptions = () => {
    return data.colorOptions.map(color => {
      return (
        <li
          key={color}
          className={classnames('d-inline-block', {
            selected: selectedColor === color
          })}
          onClick={() => setSelectedColor(color)}
        >
          <div className={`color-option b-${color}`}>
            <div className={`filloption bg-${color}`}></div>
          </div>
        </li>
      )
    })
  }

  // ** Handle Wishlist item toggle
  const handleWishlist = val => {
    if (val) {
      dispatch(deleteWishlistItem(productId))
    } else {
      dispatch(addToWishlist(productId))
    }
    dispatch(getProduct(productId))
  }

  // ** Handle Move/Add to cart
  const handleCartBtn = (val) => {

      props.addProducttoCart(val)

  }

  // ** Condition btn tag
  const CartBtnTag = data.isInCart ? Link : 'button'
console.log("props data =", data)
  return (
    <Row className='my-2'>
      <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
        <div className='d-flex align-items-center justify-content-center'>
          <img className='img-fluid product-img' src={`data:image/jpeg;base64,${data[0].O_XITMIMG}`} alt={data[0].O_XITMREF} />
        </div>
      </Col>
      <Col md='7' xs='12'>
        <h4>{data[0].O_XITMREF}</h4>
        <CardText tag='span' className='item-company'>
          By
          <a className='company-name' href='/' onClick={e => e.preventDefault()}>
            {data[0].O_XITMCATDES}
          </a>
        </CardText>
        <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
          <h4 className='item-price mr-1'>${data[0].O_XPRICE}</h4>

        </div>
        <CardText>
          Available -<span className='text-success ml-25'>In stock</span>
        </CardText>
        <CardText>{data[0].O_XNOTES}</CardText>
        <hr />
        <div className='d-flex flex-column flex-sm-row pt-1'>
            {getData(data[0])}
        </div>
      </Col>
    </Row>
  )
}

export default Product
