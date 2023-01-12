var $simpleCarousel = document.querySelector(".js-carousel--simple");
let divInfected = document.getElementsByClassName('backg')[2]
let imgInfected = document.querySelector('.infectados:nth-child(1)')
let nameInfected = document.querySelector('h3.nome-infectado')
let aboutInfected = document.querySelector('p.sobre-infectado')

new Glider($simpleCarousel, {
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  dots: ".js-carousel--simple-dots",
  arrows: {
    prev: ".js-carousel--simple-prev",
    next: ".js-carousel--simple-next",
  },
  scrollLock: true
});

function openInfectedArea() {
    
    if(divInfected.style.display == 'block'){
        divInfected.style.display = 'none'
    } else {
        divInfected.style.display = 'block'  
    }
    
}

function changeInfected() {

    if (imgInfected.style.marginLeft == '' || imgInfected.style.marginLeft == '0px') {
        imgInfected.style.marginLeft = '-300px'
        nameInfected.innerHTML = 'Espreitadores'
        aboutInfected.innerHTML = 'Depois de passar duas semanas como um corredor, o fungo no cérebro começa a crescer, rompendo o tecido da face e danificando o córtex visual do hospedeiro, fazendo com que ele chegue no segundo estágio de sua transformação. Conhecidos como espreitadores, os infectados neste estado são mais silenciosos e o seu sentido auditivo é mais aguçado. Geralmente andam em grupos pequenos e se encontram em locais fechados e escuros com bastante espaço para se esconderem de suas pressas. Em "The Last of Us: Parte II" (2020), eles as vezes podem se esconder em paredes com fungos para atacarem os jogadores de surpresa.'
    } else if (imgInfected.style.marginLeft == '-300px') {
        imgInfected.style.marginLeft = '-600px'
        nameInfected.innerHTML = 'Estaladores'
        aboutInfected.innerHTML = 'Se o infectado conseguir passar um ano inteiro sem ser morto por sobreviventes, ele consegue chegar ao terceiro estágio e se transformar na criatura mais infame dentre os estados, o estalador. Sua longa exposição ao cordyceps resulta em um crescimento fúngico enorme em seus rostos deixando-os completamente cegos. Além de possuírem faces relativamente resistentes, eles também  desenvolveram uma forma primitiva de ecolocalização por meio de seus icônicos, porém assustadores e agoniantes sons de "click". Quando provocados, esses infectados correm diretamente até sua presa enquanto balançam os seus braços agressivamente. Assim como os outros, eles também são extremamente vulneráveis a fogo e podem ser atacados furtivamente com facas ou diretamente com alguma espécie de bastão.'
    } else if (imgInfected.style.marginLeft == '-600px') {
        imgInfected.style.marginLeft = '-900px'
        nameInfected.innerHTML = 'Tropegos'
        aboutInfected.innerHTML = 'Quando um infectado que esta no processo de se transformar em um verme habita locais muito húmidos, o fungo passa por uma mutação, fazendo com que um aglomerado de esporos cresça na região da cabeça e dos ombros. Os tão chamado trôpegos são menores e menos resistentes que os vermes e também não possuem bocas, portanto eles não podem morder, mas ainda assim são extremamente perigosos por expelirem esporos ácidos em suas vitimas. Não é recomendado ficar perto deles, pois ao elimina-los, eles explodem e expelem ainda mais ácido. Por terem sido introduzidos somente em “The Last of Us Parte II” é bem improvável que essas variantes dos infectados apareçam na primeira temporada da adaptação a HBO.'
    } else if (imgInfected.style.marginLeft == '-900px') {
        imgInfected.style.marginLeft = '-1200px'
        nameInfected.innerHTML = 'Baiacu'
        aboutInfected.innerHTML = 'Após passar vários anos carregando o cordyceps em seu sistema, os infectados chegam ao seu estágio final e se tornam essa monstruosidade, o verme ou Baiacu. Neste estado, o fungo deforma completamente o corpo do hospedeiro deixando-o coberto de placas fúngicas grossas que os tornam mais fortes, resistentes e difíceis de matar, além disso, eles também podem remover partes do fungo de seu próprio corpo para usa-las como bombas que liberam esporos. Nos jogos, só é possível elimina-los com ataques de longa distancia, primeiro é preciso enfraquece-los com bastante fogo, depois use o que há de melhor em seu arsenal para terminar o processo.'
    } else if (imgInfected.style.marginLeft == '-1200px') {
        imgInfected.style.marginLeft = '-1500px'
        nameInfected.innerHTML = 'Rei dos Ratos'
        aboutInfected.innerHTML = 'Essa pútrida e repulsiva criatura é o que acontece quando alguns dos primeiros infectados são mantidos em cativeiro em um centro de trauma de um hospital abandonado durante 24 anos. O Rei dos Ratos (nomeado assim em homenagem ao raro fenômeno do reino animal onde um conjunto de ratos foi encontrado com suas caudas interligadas e fundidas através de cabelo e substâncias grudentas) é uma amálgama de todos os infectados existentes no universo de "The Last of Us", tendo a velocidade de um perseguidor, a ecolocalização de um estalador e a força de um verme. Por ter sido introduzido apenas em "The Last of Us Parte II" ele também não deve aparecer na primeira temporada da nova série da HBO.'
    } else {
        imgInfected.style.marginLeft = '0px'
        nameInfected.innerHTML = 'Corredores'
        aboutInfected.innerHTML = 'Em cerca de um a dois dias após ser mordido por um infectado ou ter inalado os esporos deixados pelo fungo, o cordyceps começa a infectar o cérebro, deixando o hospedeiro extremamente agressivo e incapaz de raciocínio lógico. Os corredores são como são chamados os infectados que ainda estão no primeiro estágio por causa de seu hábito de correr atrás de animais ou pessoas normais quando notam sua presença. Mantendo boa parte de sua aparência humana, individualmente eles são os inimigos mais fáceis de matar no jogo, porém quando estão em bandos muito grandes, sua melhor opção é fugir.'
    }
    
}

function changeInfectedLeft() {
    if (imgInfected.style.marginLeft == '' || imgInfected.style.marginLeft == '0px') {
        imgInfected.style.marginLeft = '-1500px'
        nameInfected.innerHTML = 'Rei dos Ratos'
        aboutInfected.innerHTML = 'Essa pútrida e repulsiva criatura é o que acontece quando alguns dos primeiros infectados são mantidos em cativeiro em um centro de trauma de um hospital abandonado durante 24 anos. O Rei dos Ratos (nomeado assim em homenagem ao raro fenômeno do reino animal onde um conjunto de ratos foi encontrado com suas caudas interligadas e fundidas através de cabelo e substâncias grudentas) é uma amálgama de todos os infectados existentes no universo de "The Last of Us", tendo a velocidade de um perseguidor, a ecolocalização de um estalador e a força de um verme. Por ter sido introduzido apenas em "The Last of Us Parte II" ele também não deve aparecer na primeira temporada da nova série da HBO.'
    } else if (imgInfected.style.marginLeft == '-300px') {
        imgInfected.style.marginLeft = '0px'
        nameInfected.innerHTML = 'Corredores'
        aboutInfected.innerHTML = 'Em cerca de um a dois dias após ser mordido por um infectado ou ter inalado os esporos deixados pelo fungo, o cordyceps começa a infectar o cérebro, deixando o hospedeiro extremamente agressivo e incapaz de raciocínio lógico. Os corredores são como são chamados os infectados que ainda estão no primeiro estágio por causa de seu hábito de correr atrás de animais ou pessoas normais quando notam sua presença. Mantendo boa parte de sua aparência humana, individualmente eles são os inimigos mais fáceis de matar no jogo, porém quando estão em bandos muito grandes, sua melhor opção é fugir.'
    } else if (imgInfected.style.marginLeft == '-600px') {
        imgInfected.style.marginLeft = '-300px'
        nameInfected.innerHTML = 'Espreitadores'
        aboutInfected.innerHTML = 'Depois de passar duas semanas como um corredor, o fungo no cérebro começa a crescer, rompendo o tecido da face e danificando o córtex visual do hospedeiro, fazendo com que ele chegue no segundo estágio de sua transformação. Conhecidos como espreitadores, os infectados neste estado são mais silenciosos e o seu sentido auditivo é mais aguçado. Geralmente andam em grupos pequenos e se encontram em locais fechados e escuros com bastante espaço para se esconderem de suas pressas. Em "The Last of Us: Parte II" (2020), eles as vezes podem se esconder em paredes com fungos para atacarem os jogadores de surpresa.'
    } else if (imgInfected.style.marginLeft == '-900px') {
        imgInfected.style.marginLeft = '-600px'
        nameInfected.innerHTML = 'Estaladores'
        aboutInfected.innerHTML = 'Se o infectado conseguir passar um ano inteiro sem ser morto por sobreviventes, ele consegue chegar ao terceiro estágio e se transformar na criatura mais infame dentre os estados, o estalador. Sua longa exposição ao cordyceps resulta em um crescimento fúngico enorme em seus rostos deixando-os completamente cegos. Além de possuírem faces relativamente resistentes, eles também  desenvolveram uma forma primitiva de ecolocalização por meio de seus icônicos, porém assustadores e agoniantes sons de "click". Quando provocados, esses infectados correm diretamente até sua presa enquanto balançam os seus braços agressivamente. Assim como os outros, eles também são extremamente vulneráveis a fogo e podem ser atacados furtivamente com facas ou diretamente com alguma espécie de bastão.'
    } else if (imgInfected.style.marginLeft == '-1200px') {
        imgInfected.style.marginLeft = '-900px'
        nameInfected.innerHTML = 'Tropegos'
        aboutInfected.innerHTML = 'Quando um infectado que esta no processo de se transformar em um verme habita locais muito húmidos, o fungo passa por uma mutação, fazendo com que um aglomerado de esporos cresça na região da cabeça e dos ombros. Os tão chamado trôpegos são menores e menos resistentes que os vermes e também não possuem bocas, portanto eles não podem morder, mas ainda assim são extremamente perigosos por expelirem esporos ácidos em suas vitimas. Não é recomendado ficar perto deles, pois ao elimina-los, eles explodem e expelem ainda mais ácido. Por terem sido introduzidos somente em “The Last of Us Parte II” é bem improvável que essas variantes dos infectados apareçam na primeira temporada da adaptação a HBO.'
    } else if (imgInfected.style.marginLeft == '-1500px') {
        imgInfected.style.marginLeft = '-1200px'
        nameInfected.innerHTML = 'Baiacu'
        aboutInfected.innerHTML = 'Após passar vários anos carregando o cordyceps em seu sistema, os infectados chegam ao seu estágio final e se tornam essa monstruosidade, o verme ou Baiacu. Neste estado, o fungo deforma completamente o corpo do hospedeiro deixando-o coberto de placas fúngicas grossas que os tornam mais fortes, resistentes e difíceis de matar, além disso, eles também podem remover partes do fungo de seu próprio corpo para usa-las como bombas que liberam esporos. Nos jogos, só é possível elimina-los com ataques de longa distancia, primeiro é preciso enfraquece-los com bastante fogo, depois use o que há de melhor em seu arsenal para terminar o processo.'
    }
}