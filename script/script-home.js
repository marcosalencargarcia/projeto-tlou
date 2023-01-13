let divRadio = document.querySelector('.radios')
let radio = document.getElementsByName('rimage')
let backg = document.querySelector('.backg')
let divVideos = document.querySelector('div.carrossel iframe')

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

function clickChangeVideoNext() {

    if (divVideos.src == 'https://www.youtube.com/embed/WxjeV10H1F0') {
        divVideos.src = 'https://www.youtube.com/embed/VHNzi1CjDb0'
    } else if (divVideos.src == 'https://www.youtube.com/embed/VHNzi1CjDb0') {
        divVideos.src = 'https://www.youtube.com/embed/btmN-bWwv0A'
    } else if (divVideos.src == 'https://www.youtube.com/embed/btmN-bWwv0A') {
        divVideos.src = 'https://www.youtube.com/embed/Jb-uWiePePg'
    } else if (divVideos.src == 'https://www.youtube.com/embed/Jb-uWiePePg') {
        divVideos.src = 'https://www.youtube.com/embed/vhII1qlcZ4E'
    } else if (divVideos.src == 'https://www.youtube.com/embed/vhII1qlcZ4E') {
        divVideos.src = 'https://www.youtube.com/embed/WxjeV10H1F0'
    }
}

function clickChangeVideoPrev() {
    if (divVideos.src == 'https://www.youtube.com/embed/WxjeV10H1F0') {
        divVideos.src = 'https://www.youtube.com/embed/vhII1qlcZ4E'
    } else if (divVideos.src == 'https://www.youtube.com/embed/VHNzi1CjDb0') {
        divVideos.src = 'https://www.youtube.com/embed/WxjeV10H1F0'
    } else if (divVideos.src == 'https://www.youtube.com/embed/btmN-bWwv0A') {
        divVideos.src = 'https://www.youtube.com/embed/VHNzi1CjDb0'
    } else if (divVideos.src == 'https://www.youtube.com/embed/Jb-uWiePePg') {
        divVideos.src = 'https://www.youtube.com/embed/btmN-bWwv0A'
    } else if (divVideos.src == 'https://www.youtube.com/embed/vhII1qlcZ4E') {
        divVideos.src = 'https://www.youtube.com/embed/Jb-uWiePePg'
    }
}

//<iframe width="560" height="315" src="https://www.youtube.com/embed/vhII1qlcZ4E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

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
