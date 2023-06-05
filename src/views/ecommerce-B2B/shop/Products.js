// ** React Imports
import { Fragment } from 'react'

// ** Product components
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const ProductsPage = props => {
  // ** Props
  const {
    activeView,
    setActiveView,
    store,
    sidebarOpen,
    getProducts,
    ProductsList,
    productsPrice,
    ProdcutCateg,
    dispatch,
    addToCart,
    addToWishlist,
    getCartItems,
    deleteWishlistItem,
    deleteCartItem,
    setSidebarOpen
  } = props

  // ** Handles pagination
  const handlePageChange = val => {
    if (val === 'next') {
      dispatch(getProducts({ ...store.params, page: store.params.page + 1 }))
    } else if (val === 'prev') {
      dispatch(getProducts({ ...store.params, page: store.params.page - 1 }))
    } else {
      dispatch(getProducts({ ...store.params, page: val }))
    }
  }


  return (
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
          store={store}
          dispatch={dispatch}
          activeView={activeView}
           shoppingList = {props.shoppingList}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
           products={productsPrice}
              searchValue = {props.searchValue}

        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ProductsSearchbar
        dispatch={dispatch}
        getProducts={getProducts}
        store={store}
        searchValue= {props.searchValue}
        onSearch = {props.onSearch}/>
        {store.products.length ? (
          <Fragment>
            <ProductCards
              store={store}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={productsPrice}
              getProducts={getProducts}
              shoppingList = {props.shoppingList}
              addProducttoCart = {props.addProducttoCart}
              getCartItems={getCartItems}
              searchValue = {props.searchValue}
                 categoryValue = {props.categoryValue}
                 selectPrdCateg = {props.selectPrdCateg}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
            />

          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
