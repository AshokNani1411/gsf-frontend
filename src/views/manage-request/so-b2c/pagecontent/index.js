import Products from './productsNew1'

function SalesOrderCreatePageContent(props) {

    return <div className="pageContent">
    <Products

    addProducttoCart = {props.addProducttoCart}
                 handleDecrement = {props.handleDecrement}
                 handleIncrement = {props.handleIncrement}
                 products = {props.ProductsList}
                 productsPrice = {props.productsPrice}
                 shoppingList = {props.shoppingList}
                 addProducttoCart = {props.addProducttoCart}
                 filteredData = {props.filteredData}
                 searchValue = {props.searchValue}
                 categoryValue = {props.categoryValue}

    />
     </div>
}
export default SalesOrderCreatePageContent