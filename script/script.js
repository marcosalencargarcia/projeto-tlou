let radio = document.getElementsByName('image')
let backg = document.querySelector('.backg')


function radios() {
    
    if (radio[0].checked) {
        backg.style.backgroundImage = "../imagens/second-home-background.jpg"
    } else if (radio[1].checked) {
        backg.style.background = "url(../imagens/second-home-background.jpg)"
    } else if (radio[2].checked) {
        window.alert('Olá')
        window.prompt('Olá prompt')
    } else if (radio[3].checked) {
        window.alert('Olá')
        window.prompt('Olá prompt')
    }

}


function menuPrincipal() {

    if (menu.style.display == 'block') {
        menu.style.display = 'none'
    } else {
        menu.style.display = 'block'
    }
}


