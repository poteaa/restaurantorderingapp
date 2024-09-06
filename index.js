import restaurantProducts from './data/restaurant-data'
import coffeeShopProducts from './data/coffee-shop-data'
import hardwareStoreProducts from './data/hardware-store-data'

import productItemList from './components/product/product-item-list'
import Order from './components/order/order'
import Payment from './components/payment/payment'
import ConfigOptions from './components/config-options/config-options'

import { PAYMENT_MODAL, CONFIG_MODAL } from './util/constants'

const IMG_PATH = './images/'

const productEl = document.getElementById('product')
const orderEl = document.getElementById('order')
const paymentModal = document.getElementById('payment-modal')
const configModal = document.getElementById('config-modal')
const bodyEl = document.querySelector('body')
const mainBannerEl = document.getElementById('main-banner')
const configBtnEl = document.getElementById('config-btn')
const appTitleEl = document.getElementById('app-title')
const appDescriptionEl = document.getElementById('app-description')

document.onclick = function(e) {
    if (e.target == paymentModal)
      toggleModal(e, PAYMENT_MODAL)
    else if (e.target == configModal)
      toggleModal(e, CONFIG_MODAL)
}

configBtnEl.addEventListener('click', () => toggleModal(event, CONFIG_MODAL)) 

let cart = new Map()
let currentThemeValue = 'restaurant-theme'
let product

function init() {
    setProducts()
    paymentModal.appendChild(Payment(paymentProcessed))
    configModal.appendChild(ConfigOptions(changeConfiguration))
}

function setProducts() {
    switch(currentThemeValue) {
        case 'restaurant-theme':
            product = restaurantProducts
            break
        case 'cofee-shop-theme':
            product = coffeeShopProducts
            break
        case 'hardware-store-theme':
            product = hardwareStoreProducts
            break
        default:
            product = restaurantProducts
            break
    }
    
    productEl.innerHTML = ''
    orderEl.innerHTML = ''
    productEl.appendChild(productItemList(product, addToCart))
}

function addToCart(itemId, quantity = 1) {
    const item = product.find(i => i.id === +itemId)
    if (!cart.has(item.id))
        cart.set(item.id, {name: item.name, price: item.price, quantity})
    else
        cart.get(item.id).quantity += quantity
     
    orderEl.innerHTML = ''   
    orderEl.appendChild(Order(cart, removeFromCart, toggleModal))
}

function removeFromCart(itemId) {
    const itemToDeleteId = Number(itemId)
    if (cart.has(itemToDeleteId)) {
        cart.delete(itemToDeleteId)
    }
    if (cart.size > 0)
        orderEl.replaceChild(Order(cart, removeFromCart, toggleModal), orderEl.firstChild)
    else orderEl.innerHTML = ''
}

function toggleModal(e, modalName) {
    if (e) e.stopPropagation()
    let modal
    if (modalName === PAYMENT_MODAL)
        modal = paymentModal
    else if ((modalName === CONFIG_MODAL))
        modal = configModal
    if (modal) {
        if (modal.style.display === 'none' || window.getComputedStyle(modal).display === 'none')
            modal.style.display = 'block'
        else modal.style.display = 'none'
    }
}

function paymentProcessed(userName) {
    toggleModal(null, PAYMENT_MODAL)
    orderEl.innerHTML = `<span class="order-complete">Thanks, ${userName}! Your order is on its way!</span>`
    cart.clear()
}

function changeConfiguration(config) {
    if (config.option === 'theme') {
        const { value, image } =  config
        bodyEl.classList.remove(currentThemeValue)
        bodyEl.classList.add(value)
        currentThemeValue = value
        mainBannerEl.src = IMG_PATH + image
        setProducts()
    } else if (config.option === 'app-name') {
        appTitleEl.textContent = config.value
    } else if (config.option === 'app-desc') {
        appDescriptionEl.textContent = config.value
    }
}

init()