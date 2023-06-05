import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { retrieveProductCategories } from "../../../../redux/actions/product-categories"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function Menu (props) {

 const [isMenuOpen, setIsMenuOpen] = useState(false)
 const productCategories = useSelector(state => state.productCategories)
  const dispatch = useDispatch()
  console.log("prodcut cate", productCategories)

 useEffect(() => {
         dispatch(retrieveProductCategories())

    }, [])


 const toggleMenu = () =>  {
    console.log("Inisde menu items")
    setIsMenuOpen(!isMenuOpen)

  }
    return (
      <div className="category">
        <button className="category-name"  onClick={() => toggleMenu()} >Categories
          <KeyboardArrowDownIcon className="category-arrow"  /></button>
        {isMenuOpen && productCategories && productCategories.length > 0 && productCategories.map((item, i) => (
          <ul className="category-menulist">
            <li key={item.TCLCOD_0}>{item.TEXTE_0}</li>
          </ul>
          ))
        }
      </div>
    )
}

export default Menu