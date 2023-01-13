var $simpleCarousel = document.querySelector(".js-carousel--simple")
let divInfected = document.querySelector('div.backg:nth-child(5)')
let eventchange = document.querySelector('.c-carousel')
let nameInfected = document.querySelector('h3.nome-infectado')
let aboutInfected = document.querySelector('p.sobre-infectado')
let dotsInfected = document.getElementsByClassName('carousel--simple-dots')
let imgIfected = document.getElementsByClassName('c-carousel__slide')

const observer = new MutationObserver((mutations, observer) => {
  if (imgIfected[0].className == 'c-carousel__slide glider-slide active center visible'){
    nameInfected.innerHTML = 'Runners'
    aboutInfected.innerHTML = 'Within about one to two days after being bitten by an infected person or having inhaled the spores left by the fungus, cordyceps begins to infect the brain, leaving the host extremely aggressive and incapable of logical reasoning. Runners are what the infected who are still in the first stage are called because of their habit of running after animals or normal people when they notice their presence. Keeping much of their human appearance, individually they are the easiest enemies to kill in the game, but when they are in very large groups, their best option is to flee.'
  } else if (imgIfected[1].className == 'c-carousel__slide glider-slide active center visible') {
    nameInfected.innerHTML = 'Stalkers'
    aboutInfected.innerHTML = 'After spending two weeks as a runner, the fungus in the brain begins to grow, breaking down tissue on the face and damaging the host visual cortex, causing it to reach the second stage of its transformation. Known as lurkers, those infected in this state are quieter and their sense of hearing is heightened. They usually travel in small groups and meet in closed, dark places with plenty of space to hide from their haste. In The Last of Us: Part II (2020), they can sometimes hide in walls with fungi to attack players by surprise.'
  } else if (imgIfected[2].className == 'c-carousel__slide glider-slide active center visible') {
    nameInfected.innerHTML = 'Clickers'
    aboutInfected.innerHTML = 'If the infected can go an entire year without being killed by survivors, they can reach the third stage and transform into the most infamous creature among the states, the clicker. Their long exposure to cordyceps results in massive fungal growth on their faces leaving them completely blind. As well as having relatively tough faces, they also evolved an early form of echolocation through their iconic, yet frightening and agonizing "clicking" sounds. When provoked, these infected will charge straight at their prey while swinging their arms aggressively. Like the others, they are also extremely vulnerable to fire and can be attacked stealthily with knives or directly with some kind of club.'
  } else if (imgIfected[3].className == 'c-carousel__slide glider-slide active center visible') {
    nameInfected.innerHTML = 'Shambler'
    aboutInfected.innerHTML = 'When an infected that is in the process of turning into a worm inhabits very humid places, the fungus undergoes a mutation, causing a cluster of spores to grow in the head and shoulder region. The so-called shamblers are smaller and less resistant than worms and also do nott have mouths, so they can nott bite, but they are still extremely dangerous for expelling acidic spores on their victims. It is not recommended to stay close to them, because when you eliminate them, they explode and expel even more acid. Because they were only introduced in “The Last of Us Part II” it is very unlikely that these variants of the infected will appear in the first season of the HBO adaptation.'
  } else if (imgIfected[4].className == 'c-carousel__slide glider-slide active center visible') {
    nameInfected.innerHTML = 'Bloater'
    aboutInfected.innerHTML = 'After spending several years carrying cordyceps in their system, the infected reach their final stage and become this monstrosity, the worm or Pufferfish. In this state, the fungus completely deforms the host body, leaving it covered in thick fungal plaques that make them stronger, tougher, and harder to kill. bombs that release spores. In games, you can only eliminate them with long-distance attacks, first you need to weaken them with a lot of fire, then use what is best in your arsenal to finish the process.'
  } else if (imgIfected[5].className == 'c-carousel__slide glider-slide active center visible') {
    nameInfected.innerHTML = 'Rat king'
    aboutInfected.innerHTML = 'This putrid, repulsive creature is what happens when some of the first infected are held captive in an abandoned hospital trauma center for 24 years. The Rat King (named after the rare phenomenon in the animal kingdom where a group of rats were found with their tails intertwined and fused together through hair and sticky substances) is an amalgamation of all the infected in the universe of "The Last of Us", having the speed of a stalker, the echolocation of a clicker, and the strength of a worm. Because he was only introduced in "The Last of Us Part II" he also should not appear in the first season of the new HBO series.'
  }


});

observer.observe(eventchange, {
  subtree: true,
  attributes: true
});

function openInfectedArea() {
    
    if(divInfected.style.display == 'block'){
        divInfected.style.display = 'none'
    } else {
        divInfected.style.display = 'block' 
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
    }
    
}


//glider-dot active - Classe do Button
//carousel--simple-prev - Classe para seta à esquerda
//carousel--simple-next - Classe para seta à direita
//carousel--simple-dots - Classe da DIV dos dots das imagens
//c-carousel__slide glider-slide active center visible

