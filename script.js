const cardArray = [
      { name: 'gato', emoji: '🐱' },
      { name: 'gato', emoji: '🐱' },
      { name: 'cachorro', emoji: '🐶' },
      { name: 'cachorro', emoji: '🐶' },
      { name: 'papagaio', emoji: '🦜' },
      { name: 'papagaio', emoji: '🦜' },
      { name: 'coelho', emoji: '🐰' },
      { name: 'coelho', emoji: '🐰' },
      { name: 'coracao', emoji: '❤️' },
      { name: 'coracao', emoji: '❤️' },
      { name: 'borboleta', emoji: '🦋' },
      { name: 'borboleta', emoji: '🦋' }
    ];

    const grid = document.getElementById('grid');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function shuffle(array) {
      for (let i = array.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    function createBoard() {
      grid.innerHTML = '';
      shuffle(cardArray);

      cardArray.forEach((card, index) => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.setAttribute('data-id', index);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = '❓';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = card.emoji;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardDiv.appendChild(cardInner);

        cardDiv.addEventListener('click', flipCard);

        grid.appendChild(cardDiv);
      });

      cardsChosen = [];
      cardsChosenId = [];
      cardsWon = [];
    }

    function flipCard() {
      const cardId = this.getAttribute('data-id');

      if (cardsChosenId.includes(cardId) || this.classList.contains('matched')) {
        return; // já virou ou já ganhou
      }

      this.classList.add('flip');
      cardsChosen.push(cardArray[cardId].name);
      cardsChosenId.push(cardId);

      if (cardsChosen.length === 2) {
        setTimeout(checkForMatch, 700);
      }
    }

    function checkForMatch() {
      const cards = document.querySelectorAll('.card');
      const [firstId, secondId] = cardsChosenId;

      if (cardsChosen[0] === cardsChosen[1] && firstId !== secondId) {
        // Par encontrado
        cards[firstId].classList.add('matched');
        cards[secondId].classList.add('matched');
        cardsWon.push(cardsChosen);
      } else {
        // Não é par, desvira
        cards[firstId].classList.remove('flip');
        cards[secondId].classList.remove('flip');
      }

      cardsChosen = [];
      cardsChosenId = [];

      if (cardsWon.length === cardArray.length / 2) {
        setTimeout(() => alert('Parabéns! Você encontrou todos os pares!'), 300);
      }
    }

    createBoard();
  </script>
</body>
</html>

