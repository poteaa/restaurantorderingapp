const themes = [
    {
        name: 'Restaurant',
        value: 'restaurant-theme',
        image: 'restaurant-banner.png'
    },
    {
        name: 'Coffee Shop',
        value: 'cofee-shop-theme',
        image: 'coffee-shop-banner.jpg'
    },
    {
        name: 'Hardware Store',
        value: 'hardware-store-theme',
        image: 'hardware-store-banner.jpg'
    }
]

function theme(configEl, onChangeCb) {
    const selectEl = document.createElement('select')
    selectEl.id = 'theme-selector'
    selectEl.classList.add('generic-input')
    const options = themes.map(t => `<option value="${t.value}">${t.name}</option>`).join('')
    selectEl.innerHTML = options
    selectEl.addEventListener('change', () => {
        const theme = themes.find(t => t.value === selectEl.value)
        onChangeCb({option: 'theme', value: theme.value, image: theme.image})
    })
    
    const titleEl = document.createElement('label')
    titleEl.setAttribute('for', 'theme-selector')
    titleEl.classList.add('subtitle')
    titleEl.textContent = 'Theme'
    
    configEl.appendChild(titleEl)
    configEl.appendChild(selectEl)
}

function genericConfigText(configEl, name, id, maxlength, onChangeCb) {
    
    const genericEl = document.createElement('input')
    genericEl.id = id
    genericEl.type = 'text'
    genericEl.maxLength = maxlength
    genericEl.classList.add('generic-input')
    genericEl.addEventListener('input', () => onChangeCb({ option: id, value: event.target.value}))
     
    const titleEl = document.createElement('label')
    titleEl.setAttribute('for', id)
    titleEl.classList.add('subtitle')
    titleEl.textContent = name
        
    configEl.appendChild(titleEl)
    configEl.appendChild(genericEl)
}

function rateApp(configEl) {
    const titleEl = document.createElement('label')
    titleEl.classList.add('subtitle')
    titleEl.textContent = 'Rate App'
    
    const starsEl = document.createElement('div')
    starsEl.innerHTML = `
            <span id="star-1" class="star black-star"></span>
            <span id="star-2" class="star black-star"></span>
            <span id="star-3" class="star black-star"></span>
            <span id="star-4" class="star black-star"></span>
            <span id="star-5" class="star black-star"></span>
        `
    starsEl.querySelectorAll('.black-star')
        .forEach((star, index) => star.addEventListener('click', () => rate(index)))
        
    configEl.appendChild(titleEl)
    configEl.appendChild(starsEl)
}

function rate(rateIndex) {
    const starsEl = document.getElementById('star-rating')
    document.querySelectorAll('.star')
        .forEach((star, index) => {
            if (index <= rateIndex) {
                star.classList.remove('black-star')
                star.classList.add('yellow-star')
            } else {
                star.classList.remove('yellow-star') 
                star.classList.add('black-star')
            }
        })
}

function configOptions(onchange) {
    const configEl = document.createElement('div')
    configEl.classList.add('config-options')
    
    const titleEl = document.createElement('span')
    titleEl.classList.add('title')
    titleEl.textContent = 'Application Options'
    configEl.appendChild(titleEl)
    
    theme(configEl, onchange)
    genericConfigText(configEl, 'App Name', 'app-name', 15, onchange)
    genericConfigText(configEl, 'App Desc.', 'app-desc', 35, onchange)
    rateApp(configEl)
    
    return configEl
}

export default configOptions