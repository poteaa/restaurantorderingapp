import OrderItem from './order-item'

function orderItemList(cart, onRemoveFromCart) {
    const orderItemEl = document.createElement('ul')
    orderItemEl.classList.add('order-item-list')
    cart.forEach((cartItem, key) => {
        orderItemEl.appendChild(OrderItem(key, cartItem, onRemoveFromCart))
    })
    return orderItemEl
}

export default orderItemList