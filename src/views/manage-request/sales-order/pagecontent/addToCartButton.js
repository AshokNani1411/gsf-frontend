import {useState, useEffect} from 'react'
import {List, Card, Image, Typography, Badge, Button, message} from 'antd'

import { useDispatch, useSelector } from "react-redux"
import { createSOCartRequest } from "../../../../redux/actions/drop-request"

function AddToCartButton (props)  {
 const user = JSON.parse(localStorage.getItem('userData'))
   const [loading, setLoading] = useState(false)
 const dispatch = useDispatch()

    const addProducttoCart = () => {
       setLoading(true)
             const params = {...props.item, usersite: user.X3SITE_0, loginuser: user.X3USER_0, qty : 1}
       console.log("T11 product added-", props.item.ITMREF_0)
        dispatch(createSOCartRequest(params))
               .then(data => {
                 toast.success(
                   <ToastContent header='Success' message={data.message} color='success' />,
                   { transition: Slide, hideProgressBar: true, autoClose: 2000 }
                 )
               })
               .catch(e => {
                 console.log(e)
               })

        message.success(`${props.item.ITMREF_0} has been added to Cart`)
         setLoading(false)
    }

  return (
     <Button className="AddtoCartBtn"
     type = "link"
     onClick={() => {
         addProducttoCart()
     }}
     loading = {loading}
     >Add to Cart
     </Button>
  )

}
export default AddToCartButton