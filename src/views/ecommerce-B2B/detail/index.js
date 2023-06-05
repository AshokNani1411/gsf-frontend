// ** React Imports
import { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Product detail components
import ItemFeatures from './ItemFeatures'
import ProductDetails from './ProductDetails'
import RelatedProducts from './RelatedProducts'

import { retrieveDropRequests, deleteDropRequest, createSOCartRequest, retrievesSOCartRequests } from "../../../redux/actions/drop-request"

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, deleteWishlistItem, addToWishlist, addToCart } from '../store/actions'
import { retrieveProductPrice } from "../../../redux/actions/product-price"

import '@styles/base/pages/app-ecommerce-details.scss'

const Details = (props) => {
  // ** Vars

 console.log("props", props)
 console.log("params", props.match.params.product)
  const productsPrice = useSelector(state => state.productsPrice)
   const shoppingList = useSelector(state => state.soCart)
  const productId = props.match.params.product
const user = JSON.parse(localStorage.getItem('userData'))

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

  console.log("details = id = ", props.match.params.product)

  const callAPIs = () => {
   dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, props.match.params.product))
   dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
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


  // ** ComponentDidMount : Get product
  useEffect(() => {

    callAPIs()
  }, [])

   console.log("Final product details-")
  return (
    <Fragment>
      <div className='app-ecommerce-details'>
        {Object.keys(productsPrice).length ? (
          <Card>
            <CardBody>
              <ProductDetails
                productId={props.match.params.product}
                data={productsPrice}
                shoppingList = {shoppingList}
                 addProducttoCart = {addProducttoCart}
              />
            </CardBody>
          </Card>
        ) : null}
      </div>
    </Fragment>
  )
}

export default Details
