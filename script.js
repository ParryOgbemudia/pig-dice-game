'use strict';

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  currentScore = 0;
  score = [0, 0];
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--remove');
};

init();

//switch player
const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
};

//Rolling dice functionality
btnRoll.addEventListener('click', function (e) {
  if (playing) {
    //1.Generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for rolled 1: If true, switch to next player
    if (dice !== 1) {
      //Add dice to current value
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // player0El.classList.add('player--active');
      // player1El.classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function (e) {
  if (playing) {
    diceEl.classList.add('hidden');

    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
  // score[activePlayer] += currentScore;

  // document.getElementById(`score--${activePlayer}`).textContent =
  //   score[activePlayer];

  // score[activePlayer] >= 100 ? `` : ` ${switchPlayer()}`;
});

btnNew.addEventListener('click', init);
