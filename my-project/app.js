const userScoreEl = document.getElementById('user-score');
const computerScoreEl = document.getElementById('computer-score');
const gameArea = document.querySelector('.game-area');
const mainContainer = document.querySelector('.container');
const rulesCard = document.querySelector('#rules-card');
const rulesBtn = document.querySelector('.rules-btn');
const closeBtn = document.querySelector('.close-btn');

let userScore = 0;
let computerScore = 0;

const icons = {
  rock: 'icons8-fist-67 1.png',     
  paper: 'icons8-hand-64 1.png',
  scissors: '17911 1.png'
};

function getComputerChoice() {
  const options = ['rock', 'paper', 'scissors'];
  return options[Math.floor(Math.random() * options.length)];
}

function getResult(user, computer) {
  if (user === computer) return 'tie';
  if ((user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')) {
    return 'win';
  }
  return 'loss';
}

function renderScore() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
}

function renderResultScreen(userPick, computerPick, result) {
  gameArea.innerHTML = '';

  let userPickClass = userPick === 'rock' ? 'rock' : (userPick === 'paper' ? 'paper' : 'scissors');
  let computerPickClass = computerPick === 'rock' ? 'rock' : (computerPick === 'paper' ? 'paper' : 'scissors');

  const picksRow = document.createElement('div');
  picksRow.className = 'picked-row';

  picksRow.innerHTML = `
    <div class="picked-block">
      <span class="picked-label">YOU PICKED</span>
      <div class="picked-circle ${userPickClass} ${result === 'win' ? 'picked-win' : ''}">
        <img src="${icons[userPick]}" alt="${userPick}">
      </div>
    </div>
    <div class="picked-center">
      <div class="picked-message">
        <span class="picked-result">${
          result === 'win' ? 'YOU WIN' :
          result === 'loss' ? 'YOU LOST' : 'TIE UP'
        }</span>
        ${result !== 'tie' ? '<span class="picked-sub">AGAINST PC</span>' : ''}
      </div>
      <button class="picked-replay">PLAY AGAIN</button>
    </div>
    <div class="picked-block">
      <span class="picked-label">PC PICKED</span>
      <div class="picked-circle ${computerPickClass} ${result === 'loss' ? 'picked-win' : ''}">
        <img src="${icons[computerPick]}" alt="${computerPick}">
      </div>
    </div>
  `;
  gameArea.appendChild(picksRow);

  // Show NEXT button only when user wins
  if (result === 'win') {
    const bottomRow = document.createElement('div');
    bottomRow.className = 'picked-bottom-row';
    bottomRow.innerHTML = `<button class="next-btn">NEXT</button>`;
    gameArea.appendChild(bottomRow);

    bottomRow.querySelector('.next-btn').onclick = () => {
      renderHurrayScreen();
    };
  }

  picksRow.querySelector('.picked-replay').onclick = () => {
    renderChoices();
  };
}

function renderChoices() {
  gameArea.innerHTML = `
    <div class="choices">
      <svg class="choices-lines" width="320" height="260" aria-hidden="true" focusable="false">
        <line x1="52" y1="82" x2="265" y2="82" />
        <line x1="52" y1="82" x2="160" y2="230" />
        <line x1="265" y1="82" x2="160" y2="230" />
      </svg>
      <button class="choice rock" style="left: 0px; top: 30px;">
        <img src="${icons.rock}" alt="Rock" />
      </button>
      <button class="choice scissors" style="left: 205px; top: 30px;">
        <img src="${icons.scissors}" alt="Scissors" />
      </button>
      <button class="choice paper" style="left: 102px; top: 175px;">
        <img src="${icons.paper}" alt="Paper" />
      </button>
    </div>
    <div id="rules-card" style="display: block;">
      <div class="rules-header">
        <h2>Game Rules</h2>
        <button type="button" class="close-btn">✕</button>
      </div>
      <ul>
        <li>Rock beats scissors, scissors beat paper, and paper beats rock.</li>
        <li>Agree ahead of time whether you'll count off "rock, paper, scissors, shoot" or just "rock, paper, scissors."</li>
        <li>Use rock, paper, scissors to settle minor decisions or simply play to pass the time.</li>
        <li>If both players lay down the same hand, each player lays down another hand.</li>
      </ul>
    </div>
  `;

  // Re-attach close button event
  const newCloseBtn = document.querySelector('.close-btn');
  if (newCloseBtn) {
    newCloseBtn.onclick = () => {
      document.getElementById('rules-card').style.display = 'none';
    };
  }

  document.querySelectorAll('.choice').forEach(btn => {
    btn.onclick = () => {
      const userPick = btn.classList.contains('rock') ? 'rock' :
                       btn.classList.contains('paper') ? 'paper' : 'scissors';
      const computerPick = getComputerChoice();
      const result = getResult(userPick, computerPick);

      if (result === 'win') userScore++;
      else if (result === 'loss') computerScore++;

      renderScore();
      renderResultScreen(userPick, computerPick, result);
    };
  });
}

function renderHurrayScreen() {
  mainContainer.innerHTML = `
    <div class="hurray-wrapper">
      <div class="star-container">
        <span class="star star-1">★</span>
        <span class="star star-2">★</span>
        <span class="star star-3">★</span>
        <span class="star star-4">★</span>
        <span class="star star-5">★</span>
        <span class="star star-6">★</span>
        <span class="star star-7">★</span>
        <span class="star star-8">★</span>
        <div class="trophy-icon">🏆</div>
      </div>
      <div class="hurray-title">HURRAY!!</div>
      <div class="hurray-subtitle">YOU WON THE GAME</div>
      <button class="picked-replay">PLAY AGAIN</button>
    </div>
    <button class="rules-btn">RULES</button>
  `;
  
  document.querySelector('.picked-replay').onclick = () => location.reload();
  
  const newRulesBtn = document.querySelector('.rules-btn');
  if (newRulesBtn) {
    newRulesBtn.onclick = () => {
      showRulesModal();
    };
  }
}

function showRulesModal() {
  const modal = document.createElement('div');
  modal.id = 'rules-modal-overlay';
  modal.innerHTML = `
    <div id="rules-card" style="display: block; position: fixed; top: 50%; right: 30px; transform: translateY(-50%);">
      <div class="rules-header">
        <h2>Game Rules</h2>
        <button type="button" class="close-btn">✕</button>
      </div>
      <ul>
        <li>Rock beats scissors, scissors beat paper, and paper beats rock.</li>
        <li>Agree ahead of time whether you'll count off "rock, paper, scissors, shoot" or just "rock, paper, scissors."</li>
        <li>Use rock, paper, scissors to settle minor decisions or simply play to pass the time.</li>
        <li>If both players lay down the same hand, each player lays down another hand.</li>
      </ul>
    </div>
  `;
  document.body.appendChild(modal);
  
  modal.querySelector('.close-btn').onclick = () => {
    document.body.removeChild(modal);
  };
}

// Rules button toggle
rulesBtn.onclick = () => {
  if (rulesCard.style.display === 'none' || !rulesCard.style.display) {
    rulesCard.style.display = 'block';
  } else {
    rulesCard.style.display = 'none';
  }
};

closeBtn.onclick = () => {
  rulesCard.style.display = 'none';
};

// Initialize
renderScore();

// By default, show rules card on home page
rulesCard.style.display = 'block';

document.addEventListener('click', function(e) {
  if (e.target.closest('.choice')) {
    const btn = e.target.closest('.choice');
    const userPick = btn.classList.contains('rock') ? 'rock' :
                     btn.classList.contains('paper') ? 'paper' : 'scissors';
    const computerPick = getComputerChoice();
    const result = getResult(userPick, computerPick);

    if (result === 'win') userScore++;
    else if (result === 'loss') computerScore++;

    renderScore();
    renderResultScreen(userPick, computerPick, result);
  }
});