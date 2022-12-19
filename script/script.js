let radio = document.getElementsByName('rimage')
let backg = document.querySelector('.backg')
let divRadio = document.querySelector('.radios')

divRadio.addEventListener("click", radios)

function radios() {
    
    if (radio[0].checked) {
        backg.style.backgroundImage = "url(../imagens/first-home-background.jpg)"
    } else if (radio[1].checked) {
        backg.style.background = "url(../imagens/second-home-background.jpg)"
    } else if (radio[2].checked) {
        backg.style.background = "url(../imagens/third-home-background.jpg)"
    } else if (radio[3].checked) {
        backg.style.background = "url(../imagens/fourth-home-background.jpg)"
    }

}


function menuPrincipal() {

    if (menu.style.top == '150px') {
        menu.style.top = '-100%'
    } else {
        menu.style.top = '150px'
    }

    /*
    top: 150px;
    left: 50%;
    transform: translate(-50%, 0%);
    */
}


