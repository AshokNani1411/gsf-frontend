// ** Third Party Components
import classnames from 'classnames'
import { Menu, Grid, List, ShoppingCart } from 'react-feather'
import {
  Row,
  Col,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  ButtonGroup
} from 'reactstrap'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

const ProductsHeader = props => {
  // ** Props
  const { activeView, setActiveView, dispatch, getProducts, store, setSidebarOpen } = props

const [prodList, setProdList] = useState([])
  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured'
  }

    const handleFilter = (value) => {
                console.log("Inisde handlefilter", props.searchValue)
                 let updatedData = []
                 if (props.searchValue && props.searchValue.length) {
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
           } else {
             setProdList(props.products)
           }
         }, [props.searchValue, props.products, props.categoryValue])




  return (
    <div className='ecommerce-header'>
      <Row>
        <Col sm='12'>
          <div className='ecommerce-header-items'>
            <div className='result-toggler'>
              <button className='navbar-toggler shop-sidebar-toggler' onClick={() => setSidebarOpen(true)}>
                <span className='navbar-toggler-icon d-block d-lg-none'>
                  <Menu size={14} />
                </span>
              </button>
              <span className='search-results'>{prodList.length} Results Found</span>
            </div>
            <div className='view-options d-flex'>
              <UncontrolledButtonDropdown className='dropdown-sort'>
                <DropdownToggle className='text-capitalize mr-1' color='primary' outline caret>
                  {sortToggleText[store.params.sortBy]}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'featured' }))}
                  >
                    Featured
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'price-asc' }))}
                  >
                    Lowest
                  </DropdownItem>
                  <DropdownItem
                    className='w-100'
                    onClick={() => dispatch(getProducts({ ...store.params, sortBy: 'price-desc' }))}
                  >
                    Highest
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <ButtonGroup className='btn-group-toggle'>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn grid-view-btn', {
                    active: activeView === 'grid'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('grid')}
                >
                  <Grid size={18} />
                </Button>
                <Button
                  tag='label'
                  className={classnames('btn-icon view-btn list-view-btn', {
                    active: activeView === 'list'
                  })}
                  color='primary'
                  outline
                  onClick={() => setActiveView('list')}
                >
                  <List size={18} />
                </Button>
              </ButtonGroup>
               <Badge  color='primary' badgeContent={props.shoppingList.length}  overlap="circular" >
              <Link style={{margin : "5px"}}
                                             color='success'
                                             tag= 'Link'
                                            className='btn-cart move-cart'
                                            /*eslint-disable */
                                            to = '/customer/ecommerceB2B/checkout'
                                          >
                                            <ShoppingCart className='mr-50' size={28} />

                                          </Link>
                </Badge>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ProductsHeader
