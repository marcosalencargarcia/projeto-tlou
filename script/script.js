let radio = document.getElementsByName('rimage')
let backg = document.querySelector('.backg')
let divRadio = document.querySelector('.radios')
const btnMenu = document.getElementById('btn-menu-hamb')
let imgv = document.getElementsByClassName('img-video')
let divVideos = document.querySelector('section#third > div.backg > div:nth-child(1)')
var px = 43 //margem esquerda da primeira imagem do carrossel em pixels

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
    divVideos.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/WxjeV10H1F0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'

}

function clickimagem2() {
    divVideos.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/R2Ebc_OFeug" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}

function clickimagem3() {
    divVideos.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/uRKIWQUucj0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
}

function clickimagem4() {
    divVideos.innerHTML = '<iframe src="https://www.youtube.com/embed/VHNzi1CjDb0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
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
//cada imagem irá correr 274px para ser posicionado na div carrossel
    if (px < 0) {
        px += 274
        imgv[0].style.marginLeft = `${px}px`
    } else {
        imgv[0].style.marginLeft = `-779px`
        px = -779
    }
}

function clickMudaImagemVideoDireita() {
//cada imagem irá correr 274px para ser posicionado na div carrossel
    if (px > -779 + 43) {
        px += -274
        imgv[0].style.marginLeft = `${px}px`
    } else {
        imgv[0].style.marginLeft = `43px` //reset do posicionamento inicial
        px = 43
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

