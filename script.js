const cardArray = [
{ name: 'gato', img: 'imagens/gato.png' },
{ name: 'gato', img: 'imagens/gato.png' },
{ name: 'cachorro', img: 'imagens/cachorro.png' },
{ name: 'cachorro', img: 'imagens/cachorro.png' }
];
const grid = document.getElementById('grid');
let cardsChosen = [], cardsChosenId = [], cardsWon = [];
// Embaralha as cartas
cardArray.sort(() => 0.5 - Math.random());
function createBoard() {
cardArray.forEach((card, index) => {
const cardElement = document.createElement('div');
cardElement.classList.add('card');

cardElement.setAttribute('data-id', index);
cardElement.addEventListener('click', flipCard);
const front = document.createElement('div');
front.classList.add('front');
const back = document.createElement('div');
back.classList.add('back');
cardElement.append(front, back);
grid.appendChild(cardElement);
});
}
function flipCard() {
const id = this.getAttribute('data-id');
cardsChosen.push(cardArray[id].name);
cardsChosenId.push(id);
this.classList.add('flip');
this.querySelector('.back').innerHTML =
`<img src="${cardArray[id].img}" alt="${cardArray[id].name}">`;
if (cardsChosen.length === 2) {
setTimeout(checkForMatch, 500);
}
}
function checkForMatch() {
const cards = document.querySelectorAll('.card');
const [firstId, secondId] = cardsChosenId;
if (cardsChosen[0] === cardsChosen[1]) {
cards[firstId].removeEventListener('click', flipCard);
cards[secondId].removeEventListener('click', flipCard);
cardsWon.push(cardsChosen);
} else {
cards[firstId].classList.remove('flip');
cards[secondId].classList.remove('flip');
cards[firstId].querySelector('.back').innerHTML = '';
cards[secondId].querySelector('.back').innerHTML = '';
}
cardsChosen = [];
cardsChosenId = [];
if (cardsWon.length === cardArray.length / 2) {
alert('Parabéns! Todos os pares encontrados!');
}
}
// Inicializa o tabuleiro
createBoard();
