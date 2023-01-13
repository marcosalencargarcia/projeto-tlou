let wallDesktop = document.querySelectorAll('.desktop img')

wallDesktop.forEach(element => {
    element.addEventListener("click", (event) => {
        console.log('testes', event);
    })
});