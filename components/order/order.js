import OrderItemList from './order-item-list'
import OrderItem from './order-item'
import Divider from '../../layout/divider/divider'
import { PAYMENT_MODAL } from '../../util/constants'

function order(cart, onRemoveFromCart, onToggleModal) {
    
    const orderEl = document.createElement('div')
    const divTitleEl = document.createElement('div')
    divTitleEl.classList.add('order-title')
    divTitleEl.textContent = 'Your order'
    orderEl.appendChild(divTitleEl)
    orderEl.appendChild(OrderItemList(cart, onRemoveFromCart))
    orderEl.appendChild(Divider(true, 'order-total'))
    
    const cartArray = [...cart.values()]
    const totalOrderCost = cartArray.reduce((total, current) => total + current.price * current.quantity, 0)
    
    const totalItem = {
        name: "Total price: ",
        price: totalOrderCost,
        quantity: 1
    }
    
    orderEl.appendChild(OrderItem(null, totalItem, null, true))
    
    const completeOrderBtnEl = document.createElement('button')
    completeOrderBtnEl.classList.add('btn')
    completeOrderBtnEl.id = 'complete-order-btn'
    completeOrderBtnEl.textContent = 'Complete order'
    completeOrderBtnEl.addEventListener("click", () => onToggleModal(event, PAYMENT_MODAL))
    
    orderEl.appendChild(completeOrderBtnEl)
    
    return orderEl
}

export default order