    
function productItem(item, onAddToCart) {
    const productItemEl = document.createElement('li')
    productItemEl.classList.add('product-item')
    productItemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="product-item-info">
                <div class="product-item-title">${item.name}</div>
                <p class="product-item-description">${item.ingredients}</p>
                <div class="product-item-price">$ ${item.price}</div>
            </div>
            <div class="add-to-cart">
                <button class="add-btn" id="add-btn" data-add="${item.id}">+</button>
            </div>
        `
        
    const addBtn = productItemEl.querySelector('.add-btn').addEventListener('click', () => onAddToCart(item.id))
    return productItemEl
}

export default productItem