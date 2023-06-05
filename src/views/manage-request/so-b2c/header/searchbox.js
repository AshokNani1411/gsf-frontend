import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Fragment, useEffect, useRef, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Input} from 'antd'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { Link, useHistory } from 'react-router-dom'
import Menu from './category'
import DropDown from './DropDown'
import { useDispatch, useSelector } from "react-redux"
import { retrievesSOCartRequests } from "../../../../redux/actions/drop-request"
import { retrieveProductCategories } from "../../../../redux/actions/product-categories"
import Select from 'react-select'

const { Search } = Input

function SearchBox(props) {
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem('userData'))
    const refComp = useRef(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isClearable, setIsClearable] = useState(true)
      const [isSearchable, setIsSearchable] = useState(true)

      const toggleMenu = () =>  {
         console.log("Inisde menu items")
         setIsMenuOpen(!isMenuOpen)

       }

        const history = useHistory()
              const handleRoutes = (p) => {
                        history.push(p)
              }

     return (
     <div className="socart">
     <div className="category">
     <Select
                   className="basic-single"
                   classNamePrefix="select"
                   name="color"
                   placeholder="Select Categories...."
                   options={props.productCategories}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                     onChange={props.handleChange}
                   getOptionLabel={(option) => option.TEXTE_0}
                   getOptionValue={(option) => option.TEXTE_0}
                 />

            </div>


  <div className="socart-search">
  <Search
        placeholder="Enter your favorite product"
        allowClear
        size="large"
        onSearch={props.onSearch}
      />
   </div>
<div>

  <Badge  color="primary" badgeContent={props.CartRequest.length}  overlap="circular" >
   <ShoppingCartIcon  style={{width : "60px", height : "40px"}}
                         onClick={() => handleRoutes('/customer/order/b2c/cart')} color="none" className="shopingcartIcon2"/>
   </Badge>

</div>
</div>
 )

}

export default SearchBox