import { Fragment, useEffect, useRef, useState } from 'react'

import { toast, Slide } from 'react-toastify'
import Avatar from '@components/avatar'

import { ChevronDown, Edit, Trash2, X, Check } from 'react-feather'

import { useDispatch, useSelector } from "react-redux"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardHeader,
  MDBCardGroup,
  MDBCard,
  MDBListGroup,
  MDBListGroupItem,
  MDBCardFooter,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBTypography,
  MDBRipple
} from "mdb-react-ui-kit"
import { retrieveDropRequests, deleteDropRequest, createSOCartRequest, retrievesSOCartRequests } from "../../../../redux/actions/drop-request"
import '../salesordercreation.css'
import { Row, Col, Label, Card, Input, CardHeader, CardTitle, Button, Badge, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { retrieveProductPrice } from "../../../../redux/actions/product-price"


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

 function ProductDetail(props) {

  const productsPrice = useSelector(state => state.productsPrice)
   const shoppingList = useSelector(state => state.soCart)

 const user = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
 const prevSOCart = useRef()


  const callAPIs = () => {
   dispatch(retrieveProductPrice(user.X3SITE_0, '', user.X3USER_0, props.match.params.id))
   dispatch(retrievesSOCartRequests(user.X3SITE_0, user.X3USER_0))
  }

 useEffect(() => {
 const prodid = props.match.params.id

 console.log("inside use effect -params", prodid)
   // getAllPrice(user.X3SITE_0, '', user.X3USER_0)
   callAPIs()

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
  const handleDecrement = (prd, oldqty) => {

    console.log("decrement - prd", prd)
    const updatedQty = Number(oldqty) - 1
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

  }

  const handleIncrement = (prd, oldqty) => {
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



   const getData = (prd) => {

        let mflag = false
          console.log("Shopping cart =", shoppingList)
        if (shoppingList.length > 0) {

        shoppingList.map((cart, i) => {
              console.log("Inside ", i)
               console.log("Inside cart ", cart)
            if (cart.ITMREF_0 === prd.O_XITM) {
              mflag = true
            }
        })
        }
         console.log("Inside getDAta", shoppingList)
       if (mflag) {
            console.log("Inside getDAta matched", prd.O_XITM)

           const tindex = shoppingList.findIndex(item => item.ITMREF_0 === prd.O_XITM)
           console.log("Inside tindex=", tindex)
           const tempQty = shoppingList[tindex].QTY_0
          return (
            <MDBCol  md="5" className="mr-2 mb-lg-0">
         <div class="input-group">
                                                                <button type="button" disabled={tempQty < 2} onClick={() => handleDecrement(prd, tempQty)} className="increbtn input-group-text"> - </button>
                                                                 <div className="form-control text-center">{tempQty}</div>
                                                                <button type="button"  onClick={() => handleIncrement(prd, tempQty)} className="increbtn input-group-text"> + </button>
                                                    </div>
        </MDBCol>
                                                                            )
          } else {
                                  return (<div>
                <MDBBtn onClick={() => { addProducttoCart(prd) }} className="AddtoCartBtn" rounded size='lg' color='secondary'>
                                                                  Add to Cart
                                                                </MDBBtn>

                                                          </div>)
                                                          }


    }





console.log("prodcut details are", productsPrice)
  return (
     <div className="w-100">
            <Row>
              <Col sm='12'>
                <Card>
                  <CardHeader className='flex-md-row flex-column align-md-items-center border-bottom'>
                   <CardTitle tag='h2' style={{fontSize : "26px", fontWeight : "600"}}>Product Detail </CardTitle>
                    <Button.Ripple color='primary' tag={Link} to='/customer/order/create'>
                                   Continue Shopping
                     </Button.Ripple>
                    {/* <Button.Ripple color='primary' tag={Link} to='/invoices/create'>
                        Add New Invoice Request
                    </Button.Ripple> */}
                  </CardHeader>
                    <MDBRow className="justify-content-center my-2">

                        <MDBCol md="5" >
                           {productsPrice  && productsPrice.length > 0 && productsPrice.map((prd, i) => (
                          <MDBCard className="productdetail_img">
                            <MDBCardBody>
                                        <MDBRow>
                                         <MDBCol lg="5" md="3" className=" mb-0 mb-lg-0">
                                             <MDBRipple
                                                                    rippleColor="light"
                                                                    rippleTag="div"
                                                                    className="bg-image rounded hover-zoom mt-1"
                                                                  >
                                                                    {  prd.BLOB_0 === null ?  <MDBCardImage className="prd_detail_image"

                                                                       src={productImg}


                                                                                           />  : <MDBCardImage className="prd_detail_image"
                                                                      src={`data:image/png;base64,${prd.O_XITMIMG}`}


                                                                    />
                                                                    }
                                                                     </MDBRipple>

                                         </MDBCol>

                                        </MDBRow>


                                      </MDBCardBody>
                                    </MDBCard>
                                    ))
                             }
                       </MDBCol>
                          <MDBCol md="6">
                               <MDBCard className="mb-4">
                                 <MDBCardHeader>
                                   <MDBTypography block tag="h5" className="mb-0">
                                     <strong style={{fontSize:"28px"}}>{productsPrice  && productsPrice.length > 0 && productsPrice[0].O_XITMREF}</strong>
                                   </MDBTypography>
                                 </MDBCardHeader>
                                 <hr />
                                 <MDBCardBody>
                                   <MDBListGroup flush>
                                     <MDBListGroupItem
                                       className="d-flex justify-content-between align-items-center border-0 px-0 mb-0">
                                       <div style={{fontSize:"20px"}}>
                                         Product Code
                                       </div>
                                       <span>
                                         <strong style={{fontSize:"20px"}}>{productsPrice  && productsPrice.length > 0 && productsPrice[0].O_XITM}</strong>
                                       </span>
                                     </MDBListGroupItem>
<MDBListGroupItem
                                       className="d-flex justify-content-between align-items-center border-0 px-0 mb-0">
                                       <div style={{fontSize:"20px"}}>
                                         Product Category
                                       </div>
                                       <span>
                                         <strong style={{fontSize:"20px"}}>{productsPrice  && productsPrice.length > 0 && productsPrice[0].O_XITMCATDES}</strong>
                                       </span>
                                     </MDBListGroupItem>
                                     <MDBListGroupItem
                                                                            className="d-flex justify-content-between align-items-center border-0 px-0 mb-4">
                                                                            <span>
                                                                              <strong style={{fontSize:"24px"}}>{productsPrice  && productsPrice.length > 0 && productsPrice[0].O_XNOTES}</strong>
                                                                            </span>
                                                                          </MDBListGroupItem>

                                    <MDBListGroupItem
                                              className="d-flex justify-content-around align-items-center border-0 px-0 mb-0">
                                                                            <span>
                                                                              <strong style={{fontSize:"24px"}}>Price : ${productsPrice  && productsPrice.length > 0 && productsPrice[0].O_XPRICE}</strong>
                                                                            </span>
                                                                             <span>
                                                                            {productsPrice  && productsPrice.length > 0 && getData(productsPrice[0])}
                                                                             </span>

                                                                          </MDBListGroupItem>

                                   </MDBListGroup>

                                 </MDBCardBody>
                               </MDBCard>
                             </MDBCol>

                   </MDBRow>

                              <hr className="my-4" />

                </Card>
              </Col>
              </Row>
                  </div>

      )

}
export default ProductDetail
