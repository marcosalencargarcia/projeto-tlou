let radio = document.getElementsByName('rimage')
let backg = document.querySelector('.backg')
let divRadio = document.querySelector('.radios')
const btnMenu = document.getElementById('btn-menu-hamb')
let imgv = document.getElementsByClassName('img-video')
let divVideos = document.querySelector('section#third > div.backg > div:nth-child(1)')
var px = 43 //margem esquerda da primeira imagem do carrossel em pixels
let divInfected = document.getElementsByClassName('backg')[2]
let imgInfected = document.querySelector('img.infectados')
let nameInfected = document.querySelector('h3.nome-infectado')
let aboutInfected = document.querySelector('p.sobre-infectado')

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

function openInfectedArea() {
    
    if(divInfected.style.display == 'block'){
        divInfected.style.display = 'none'
    } else {
        divInfected.style.display = 'block'  
    }
    
}

function changeInfected() {

    
}

// function clickMudaImagemVideo() {
// //cada imagem irá correr 274px para ser posicionado na div carrossel
//     if (px < 0) {
//         px += 274
//         imgv[0].style.marginLeft = `${px}px`
//     } else {
//         imgv[0].style.marginLeft = `-779px`
//         px = -779
//     }
// }

// function clickMudaImagemVideoDireita() {
// //cada imagem irá correr 274px para ser posicionado na div carrossel
//     if (px > -779 + 43) {
//         px += -274
//         imgv[0].style.marginLeft = `${px}px`
//     } else {
//         imgv[0].style.marginLeft = `43px` //reset do posicionamento inicial
//         px = 43
//     }
// }

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

