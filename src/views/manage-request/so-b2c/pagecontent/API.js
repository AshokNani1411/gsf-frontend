const getDummyProducts = () => {
   return (fetch('https://dummyjson.com/products')
    .then(res => res.json()))

}
export default getDummyProducts