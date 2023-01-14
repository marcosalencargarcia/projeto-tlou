let wallDesktop = document.querySelectorAll('.desktop img, .phone img')
let popup = document.querySelector('.popup-wrapper')
let imgPopup = document.querySelector('.popup-content img')
let popupclose = document.querySelector('.popup-close')

wallDesktop.forEach(element => {
    element.addEventListener("click", (event) => {
        popup.style.display = 'block'
        imgPopup.src = event.currentTarget.src
    })
});

popupclose.addEventListener("click", () => {
    popup.style.display = 'none'
})

popup.addEventListener("click", (event) => {
    console.log('', event)
    if (event.target === event.currentTarget) {
        popup.style.display = 'none'
    }
})

