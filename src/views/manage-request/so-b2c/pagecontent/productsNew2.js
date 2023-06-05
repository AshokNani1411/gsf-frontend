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

                   <MDBCard shadow='0' border='square rounded-9' style={{backgroundColor : "#848884"}} className='h-100'>
                     <MDBRipple
                       rippleColor="light"
                       rippleTag="div"
                       className="bg-image rounded hover-zoom"
                     >
                       {  prd.BLOB_0 === null ?  <MDBCardImage className="cardimg"

                          src={productImg}


                                              />  : <MDBCardImage className="cardimg rounded-6"
                         src={`data:image/png;base64,${encode(prd.BLOB_0.data)}`}


                       />
                       }
                        </MDBRipple>
                     <MDBCardBody>
                       <MDBCardTitle>
                       <a href="#!" className="text-reset">
                         <h1 className="card-title mb-3" style={{ color : "white", fontSize : "32px"}}>{prd.ITMDES1_0}</h1>
                       </a>
                      <h4>
                                                     <span className="badge  ms-2" style={{ color : "white", fontSize : "22px"}}>{prd.ITMREF_0}</span>
                                                   </h4>

                       <div className="d-flex justify-content-around align-items-end h-100 mt-2">
                                                    <h2 style={{ color : "white", fontSize : "32px"}}>
                                                      ${prd.BASPRI_0}
                                                    </h2>
                                                    <h2>
                                                                                                          <span className="badge ms-2 pt-1" style={{width : "150px", height: "50px", border : "1px solid white"}}>Add to Cart</span>
                                                                                                        </h2>
                                                  </div>
                                                   </MDBCardTitle>

                     </MDBCardBody>
                   </MDBCard>

                 </MDBCol>
)) }
               </MDBRow>
             </MDBContainer>
           )

}
export default Products