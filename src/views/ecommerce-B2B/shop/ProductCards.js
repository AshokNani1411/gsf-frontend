// ** React Imports
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'

const ProductCards = props => {
  // ** Props
  const {
    store,
    products,
    activeView,
    addToCart,
    dispatch,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem
  } = props

const [prodList, setProdList] = useState([])
  // ** Handle Move/Add to cart
  const handleCartBtn = (val) => {

      props.addProducttoCart(val)

  }

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }


   const getData = (prd, i) => {

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



   const handleFilter = (value) => {
              console.log("Inisde handlefilter", value)
               let updatedData = []
               if (value && value.length > 0) {
                 updatedData = props.products && props.products.filter(product => {
                   let isMatch = false
                   Object.keys(product).forEach(key => {
                     if (product[key] && product[key] !== " " && product[key].toString().toLowerCase().includes(value.toLowerCase())) {
                       isMatch = true
                     }
                   })
                   return isMatch
                 })
                 setProdList(updatedData)
                }
             }




   useEffect(() => {
  console.log("prod list useeffect")
  console.log("prod list useeffect", props.products)
       if (props?.searchValue?.length > 0) {
          console.log("prod insdie list matched")
         handleFilter(props.searchValue)
         } else if (props?.selectPrdCateg?.length > 0) {
          console.log("prod insdie list matched - prd categ", props.selectPrdCateg)
                  handleFilter(props.selectPrdCateg)
         } else {
           setProdList(props.products)
         }
       }, [props.searchValue, props.products, props.categoryValue, props.selectPrdCateg])



  // ** Renders products
  const renderProducts = () => {
   console.log("insdide RenderProdcuts =", prodList)
    if (prodList.length) {
      return prodList.map(item => {

        return (
          <Card className='ecommerce-card' key={item.O_XITM}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/customer/ecommerceB2B/product-detail/${item.O_XITM}`}>
                <img className='img-fluid card-img-top' src={`data:image/jpeg;base64,${item.O_XITMIMG}`} alt={item.name} />
              </Link>
            </div>
            <CardBody>
              <div className='item-wrapper' style={{justifyContent : "right"}}>
                <div className='item-cost'>
                  <h6 className='item-price' style={{fontSize : "large"}}>${Number(item.O_XPRICE).toFixed(0)}</h6>
                </div>
              </div>
              <h4 className='item-name'>
                <Link className='text-body' to={`/customer/ecommerceB2B/product-detail/${item.O_XITM}`}>
                  {item.O_XITMREF}
                </Link>
                <CardText tag='span' className='item-company'>
                  By{' '}
                  <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                    {item.O_XITMREF}
                  </a>
                </CardText>
              </h4>
              <CardText className='item-description'>{item.O_XITMREF}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>${item.O_XPRICE}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                disable = "true"
                className='btn-wishlist'
                color='light'
                onClick={() => handleWishlistClick(item.O_XITM, item.isInWishlist)}
              >

                <span></span>
              </Button>
                 {getData(item)}

            </div>
          </Card>
        )
      })
    }
  }

  return (
    <div
      className={classnames({
        'grid-view': activeView === 'grid',
        'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
