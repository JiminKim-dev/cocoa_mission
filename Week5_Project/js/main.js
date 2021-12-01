import wordData from "./typing_words.js"

class DataManager {
  constructor() {
    this.words = wordData;
    this.score = 0;
    this.life = 5;
  }

  shuffleWords = (arr) => {
    for (let i = this.words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };
}

class RainingViewManager {
  constructor(model) {
    this.model = model;

    this.input = document.querySelector('.field-typing-area');
    this.field = document.querySelector('.field-raining');
  }

  resetInput() {
    this.input.value = '';
  }

  randomPlace(e) {
    e.style.left = `${(Math.floor(Math.random() * 90))}%`;
  }

  renderWord() {
    const words = this.model.shuffleWords(this.model.words);
      for(let i = 0; i < words.length; i++) {
        (x => { 
          setTimeout(() => this.addWord(words[x]), 2000 * x);
        })(i);
      }
  }

  addWord(value) {
    const newWord = this.createWord(value);

    this.randomPlace(newWord);
    this.field.appendChild(newWord);

    setTimeout(() => { 
      newWord.classList.add('rain');
    }, 2000);
  }

  createWord(value) {
    const newWord = document.createElement('span');
    newWord.setAttribute('class', 'word')
    newWord.innerText = value;

    return newWord
  }

  removeWord() {
    for (let span of document.querySelectorAll('.word')) {
      if (span.textContent !== this.input.value && this.input.value !== '') {
        this.input.classList.add('error');
      } else if (this.input.value === '') {
        this.input.classList.remove('error');
      } else if (span.textContent === this.input.value) {
        span.remove();
        this.resetInput();
        this.model.score += 10;
      } 
    }
  }

  countHeart() {
    let showLife = document.querySelector('.life');
    for (let i = 0; i < this.model.life; i++) {
      showLife.innerText += '❤️';
    }

    return showLife
  }

  updateScore() {
    document.querySelector('.score').innerText = this.model.score;
  }
}

class ModalViewManager {
  constructor(model) {
    this.model = model;

    this.start = document.querySelector('.game-start-btn');
    this.end = document.querySelector('.game-over-modal'); 
    this.replay = document.querySelector('.game-replay-btn');
  }

  hiddenStartModal() {
    document.querySelector('.game-start-modal').classList.add('start');
  }

  hiddenEndModal() {
    this.end.classList.remove('end');
  }

  showWinModal() {
    this.end.classList.add('end');
    this.end.children[0].innerText = "You Win 🎉"
    document.querySelector('.end-score').innerText = this.model.score;
  }
}

class GameController {
  constructor(model, rainingView, modalView) {
    this.model = model;
    this.rainingView = rainingView;
    this.modalView = modalView;
  }

  init() {
    this.rainingView.countHeart();
    this.startGame();
  }

  startGame() {
    this.modalView.start.addEventListener('click', () => {
      this.modalView.hiddenStartModal();
      this.rainingView.renderWord();
      this.enterPressHandler();
    })
  }

  enterPressHandler() {
    this.rainingView.input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.rainingView.removeWord();
        this.rainingView.updateScore();
      }

      if (this.model.score === this.model.words.length * 10) {
        this.modalView.showWinModal();
        this.replayGame();
      };
    })
  }

  replayGame() {
    this.modalView.replay.addEventListener('click', () => {
      this.modalView.hiddenEndModal();
      this.rainingView.renderWord();
      this.enterPressHandler();
    })
  }
}

const dataManager = new DataManager();
const rainingViewManager = new RainingViewManager(dataManager);
const modalViewManager = new ModalViewManager(dataManager)
const gameController = new GameController(dataManager, rainingViewManager, modalViewManager);
gameController.init();