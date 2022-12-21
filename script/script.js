let radio = document.getElementsByName('rimage')
let backg = document.querySelector('.backg')
let divRadio = document.querySelector('.radios')
const btnMenu = document.getElementById('btn-menu-hamb')
let imgv = document.getElementsByClassName('img-video')
let videos = document.getElementsByTagName('iframe')
var px = 0

divRadio.addEventListener("click", radios)
imgv[0].addEventListener("click", clickimagem1)
imgv[1].addEventListener("click", clickimagem2)
imgv[2].addEventListener("click", clickimagem3)
imgv[3].addEventListener("click", clickimagem4)


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

function clickimagem1() {
    videos[0].style.opacity = '1'
    videos[1].style.opacity = '0'
    videos[2].style.opacity = '0'
    videos[3].style.opacity = '0'

}

function clickimagem2() {
    videos[0].style.opacity = '0'
    videos[1].style.opacity = '1'
    videos[2].style.opacity = '0'
    videos[3].style.opacity = '0'
}

function clickimagem3() {
    videos[0].style.opacity = '0'
    videos[1].style.opacity = '0'
    videos[2].style.opacity = '1'
    videos[3].style.opacity = '0'
}

function clickimagem4() {
    videos[0].style.opacity = '0'
    videos[1].style.opacity = '0'
    videos[2].style.opacity = '0'
    videos[3].style.opacity = '1'
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
        imgv[0].style.marginLeft = `${px}px`
    }
}

function clickMudaImagemVideoDireita() {

    if (px > -795) {
        px += -265
        imgv[0].style.marginLeft = `${px}px`
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

