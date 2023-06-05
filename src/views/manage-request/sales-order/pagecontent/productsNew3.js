import {useState, useEffect} from 'react'
import getDummyProducts from './API'
import {List, Card, Image, Typography, Badge, Button} from 'antd'
import { useDispatch, useSelector } from "react-redux"
import AddToCartButton from './addToCartButton'
import Counter from './counter'
import productImg from '@src/assets/images/pages/img.png'
import { retrieveProducts } from "../../../../redux/actions/product"
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCardText,
  MDBCardGroup,
  MDBCard,
  MDBCardFooter,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBCardTitle,
  MDBBtn,
  MDBRipple
} from "mdb-react-ui-kit"
function Products() {

 const products = useSelector(state => state.products)
 const user = JSON.parse(localStorage.getItem('userData'))
 const dispatch = useDispatch()

  const encode = (input) => {
    input = new Uint8Array(input)
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    let output = ""
    let chr1, chr2, chr3, enc1, enc2, enc3, enc4
    let i = 0

    while (i < input.length) {
        chr1 = input[i++]
        chr2 = i < input.length ? input[i++] : Number.NaN
        chr3 = i < input.length ? input[i++] : Number.NaN

        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63

        if (isNaN(chr2)) {
            enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
            enc4 = 64
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4)
    }
    return output
  }

  useEffect(() => {

    dispatch(retrieveProducts(user.X3SITE_0))


   /*
    getDummyProducts().then(res => {
      setProductsData(res.products)
    })
*/
  }, [])

  return (<MDBContainer fluid className="my-5 text-center">
               <MDBRow>

               {products && products.length > 0 && products.map((prd, i) => (
                 <MDBCol md="12" lg="3" className="mb-4">
                   <div class="card">
                       <div class="card-head">
                          {  prd.BLOB_0 === null ? <img src={productImg} alt="logo" class="card-logo" /> : <img src={`data:image/png;base64,${encode(prd.BLOB_0.data)}`} alt="logo" class="card-logo" /> }
                       </div>
                       <div class="card-body">
                         <div class="product-desc">
                           <span class="product-title">
                                   <b>{prd.ITMDES1_0}</b>
                                   <span class="badge">
                                     {prd.TCLCOD_0}
                                   </span>
                           </span>
                           <span class="product-caption">
                                   {prd.ITMREF_0}
                                 </span>

                           <div class="product-cart mt-3">
                                   <Button  >Add to Cart</Button>
                                 </div>


 <div class="product-price ml-5 mt-3">
                                                              USD<b>{prd.BASPRI_0}</b>
                                                            </div>
                         </div>
                       </div>
                     </div>
                   </MDBCol>
)) }
               </MDBRow>
             </MDBContainer>
           )

}
export default Products