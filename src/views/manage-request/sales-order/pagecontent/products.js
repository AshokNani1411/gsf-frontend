import {useState, useEffect} from 'react'
import getDummyProducts from './API'
import {List, Card, Image, Typography, Badge, Button} from 'antd'
import { useDispatch, useSelector } from "react-redux"
import AddToCartButton from './addToCartButton'
import Counter from './counter'
import productImg from '@src/assets/images/pages/img.png'
import { retrieveProducts } from "../../../../redux/actions/product"
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

  return (<div>
    <List
      grid = {{column : 4}}
      renderItem={(product, index) => {
         return (
           <Badge.Ribbon text={product.TCLCOD_0} >
           <Card
             className="ItemCard"
             title = {product.ITMDES1_0}
             key = {index}
             cover = {
             product.BLOB_0 === null ? <Image className="ProductImage" src={productImg} /> : <Image className="ProductImage" src={`data:image/png;base64,${encode(product.BLOB_0.data)}`} />
             }
             actions = {[<Counter />, <AddToCartButton item = {product}/>]}
             >
            <Card.Meta
              title = {
                 <div className="prodCardMeta">
                  <Typography.Paragraph>Code : {product.ITMREF_0} </Typography.Paragraph>
                 <Typography.Paragraph>Price : ${product.BASPRI_0} </Typography.Paragraph>
                 </div>
              }
              ></Card.Meta>

             </Card>
             </Badge.Ribbon>
         )
      }}
      dataSource={products}
      ></List>
  </div>)
}
export default Products