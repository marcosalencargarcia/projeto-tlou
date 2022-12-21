let radio = document.getElementsByName('rimage')
let backg = document.querySelector('.backg')
let divRadio = document.querySelector('.radios')
const btnMenu = document.getElementById('btn-menu-hamb')
let imgv = document.getElementsByClassName('img-video')[0]
var px = 0

divRadio.addEventListener("click", radios)


setInterval(function autoImage() {
    clickMudaImagemDireita()
}, 10000)


function radios() {
    
    if (radio[0].checked) {
        backg.style.backgroundImage = "url(../imagens/first-home-background.jpg)"
    } else if (radio[1].checked) {
        backg.style.backgroundImage = "url(../imagens/second-home-background.jpg)"
    } else if (radio[2].checked) {
        backg.style.backgroundImage = "url(../imagens/third-home-background.jpg)"
    } else if (radio[3].checked) {
        backg.style.backgroundImage = "url(../imagens/fourth-home-background.jpg)"
    }
    /*
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    */

}

function menuPrincipal() {

    if (menu.style.top == '150px') {
        menu.style.top = '-100%'
    } else {
        menu.style.top = '150px'
    }

    btnMenu.classList.toggle('animacao')

    /*
    top: 150px;
    */
}

function clickMudaImagemDireita() {

    if (radio[0].checked) {
        backg.style.backgroundImage = "url(../imagens/second-home-background.jpg)"
        radio[1].checked = true
    } else if 
    (radio[1].checked) {
        backg.style.backgroundImage = "url(../imagens/third-home-background.jpg)"
        radio[2].checked = true
    } else if (radio[2].checked) {
        backg.style.backgroundImage = "url(../imagens/fourth-home-background.jpg)"
        radio[3].checked = true
    } else if (radio[3].checked) {
        backg.style.backgroundImage = "url(../imagens/first-home-background.jpg)"
        radio[0].checked = true
    }

}

function clickMudaImagemEsquerda() {
    if (radio[0].checked) {
        backg.style.backgroundImage = "url(../imagens/fourth-home-background.jpg)"
        radio[3].checked = true
    } else if 
    (radio[1].checked) {
        backg.style.backgroundImage = "url(../imagens/first-home-background.jpg)"
        radio[0].checked = true
    } else if (radio[2].checked) {
        backg.style.backgroundImage = "url(../imagens/second-home-background.jpg)"
        radio[1].checked = true
    } else if (radio[3].checked) {
        backg.style.backgroundImage = "url(../imagens/first-home-background.jpg)"
        radio[2].checked = true
    }
}

function clickMudaImagemVideo() {

    if (px < 0) {
        px += 265
        imgv.style.marginLeft = `${px}px`
    }
}

function clickMudaImagemVideoDireita() {

    if (px > -795) {
        px += -265
        imgv.style.marginLeft = `${px}px`
    }
}

/*
var startingx, atartinfy, movingx, movingy
function touchstart(evt) {
    startingx = evt.touches[0].clientX
    startingy = evt.touches[0].clientY
}

function touchmove(evt){
    movingx = evt.touches[0].clientX
    movingy = evt.touches[0].clientY
}

function touchend(){
    if (startingx+100 < movingx) {
        window.alert('Moveu para a direita!')
    } else if (startingx-100 > movingx) {
        window.alert('Moveu para a esquerda!')
    }
}
*/

