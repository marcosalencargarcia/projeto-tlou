let wallDesktop = document.querySelectorAll('.desktop img, .phone img')
let popup = document.querySelector('.js-popup-wrapper')
let imgPopup = document.querySelector('.js-popup-content img')
let popupClose = document.querySelector('.js-popup-close')

wallDesktop.forEach(element => {
    element.addEventListener("click", (event) => {
        popup.style.display = 'flex'
        imgPopup.src = event.currentTarget.src
    })
});

popupClose.addEventListener("click", () => {
    popup.style.display = 'none'
})

popup.addEventListener("click", (event) => {
    console.log('', event)
    if (event.target === event.currentTarget) {
        popup.style.display = 'none'
    }
})

