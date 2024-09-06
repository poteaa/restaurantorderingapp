
function validateNumber(maxLength) {
    var regex = /[0-9]|\./
    let key = event.keyCode || event.which
    key = String.fromCharCode(key)
    if( !regex.test(key) || event.target.value.length >= maxLength) {
        event.returnValue = false
        if(event.preventDefault) event.preventDefault()
    }
}

export { validateNumber }