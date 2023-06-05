import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { retrieveProductCategories } from "../../../../redux/actions/product-categories"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Select from 'react-select'

function DropDown (props) {

 const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
const [isClearable, setIsClearable] = useState(true)
  const [isSearchable, setIsSearchable] = useState(true)

 const toggleMenu = () =>  {
    console.log("Inisde menu items")
    setIsMenuOpen(!isMenuOpen)

  }
    return (
      <div className="dropDownProfile">
        <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={isClearable}
                isSearchable={isSearchable}
                name="color"
                options={props.productCategories.TEXTE_0}
              />


      </div>
    )
}

export default DropDown