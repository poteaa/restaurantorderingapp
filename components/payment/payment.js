import { validateNumber} from '../../util/validators'

const paymentEl = document.createElement('section')

function paymentForm(onPaymentProcessed) {
    paymentEl. innerHTML = `
            <form class="payment-form">
                <div class="title">Enter card details</div>
                <input type="text" class="input-text" placeholder="Enter your name" required id="card-holder-name">
                <input type="text" class="input-text" placeholder="Enter card number" required id="card-number" minlength="16">
                <input type="text" class="input-text" placeholder="Enter CVV" required id="card-cvv">
                <button class="btn">Pay</button>
            </form>
        `
    paymentEl.addEventListener("submit", () => processPayment(event, onPaymentProcessed))
    paymentEl.querySelector('#card-number').addEventListener('keypress', () => validateNumber(16))
    paymentEl.querySelector('#card-cvv').addEventListener('keypress', () => validateNumber(3))
    return paymentEl
}

function processPayment(e, paymentProcessed) {
   e.preventDefault()
   let cardHolderName = paymentEl.querySelector("#card-holder-name").value
   const spaceInName = cardHolderName.indexOf(' ')
   if(spaceInName > 0)
    cardHolderName = cardHolderName.substring(0, spaceInName)
   paymentProcessed(cardHolderName)
}

export default paymentForm