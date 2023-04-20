const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active')
})

closeElem.addEventListener('click', () => {
    menu.classList.remove('active')
})


const PercentCounters = document.querySelectorAll('.iuse__percent-quantity');
const PercentLines = document.querySelectorAll('.iuse__percent-loader-wrapper .iuse__percent-loader');

console.log(PercentCounters);
console.log(PercentLines);

PercentCounters.forEach( (item, i) => {
    PercentLines[i].style.width = item.innerHTML;
})