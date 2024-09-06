import productItem from './product-item'
import Divider from '../../layout/divider/divider'
    
function productItemList(product, onAddToCart) {
    const productItemListEl = document.createElement('ul')
    productItemListEl.classList.add('product-item-list')
    product.forEach(item => {
        productItemListEl.appendChild(productItem(item, onAddToCart))
        productItemListEl.appendChild(Divider())
    })
    return productItemListEl
}

export default productItemList