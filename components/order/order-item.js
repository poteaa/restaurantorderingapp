// TODO: remove unnecessary id param

function orderItem(id, item, onRemoveFromCart, isTotalItem = false) {
    
    const orderItemEl = document.createElement(isTotalItem ? 'div' : 'li')
    orderItemEl.classList.add('order-item')
    const spanNameEl = document.createElement('span')
    spanNameEl.classList.add('order-item-name')
    spanNameEl.textContent = item.name
    orderItemEl.appendChild(spanNameEl)
    if (!isTotalItem) {
        spanNameEl.textContent = `${item.name} ( ${item.quantity} )`
        const removeBtnEl = document.createElement('button')
        removeBtnEl.classList.add('order-item-remove')
        removeBtnEl.textContent = 'remove'
        orderItemEl.appendChild(removeBtnEl)
        orderItemEl.querySelector('.order-item-remove').addEventListener("click", () => onRemoveFromCart(id))
    }
    const spanTotalPriceEl = document.createElement('span')
    spanTotalPriceEl.classList.add('order-item-total-price')
    spanTotalPriceEl.textContent = `$ ${item.price*item.quantity}`
    orderItemEl.appendChild(spanTotalPriceEl)
    return orderItemEl
}

export default orderItem