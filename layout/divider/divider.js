function divider(isDark = false, cssClass = '') {
    const dividerEl = document.createElement('hr')
    dividerEl.classList.add(isDark ? 'divider-dark' : 'divider')
    if (cssClass) dividerEl.classList.add(cssClass)
    return dividerEl
}

export default divider