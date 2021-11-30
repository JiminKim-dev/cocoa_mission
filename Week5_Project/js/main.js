import wordData from "./typing_words.js"

class DataManager {
  constructor() {
    this.words = wordData;
    this.score = 0;
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

    this.start = document.querySelector('.game-start-btn');
    this.input = document.querySelector('.field-typing-area');
    this.field = document.querySelector('.field-raining');

    this.end = document.querySelector('.game-over-modal'); 
    this.replay = document.querySelector('.game-replay-btn');
  }

  resetInput() {
    this.input.value = '';
  }

  hiddenStartModal() {
    document.querySelector('.game-start-modal').classList.add('start');
  }

  hiddenEndModal() {
    this.endModal.classList.remove('end');
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
      } 
    }
  }

  updateScore() {
    document.querySelector('.score').innerText = this.model.score;
  }

  showWinModal() {
    this.end.classList.add('end');
    this.end.children[0].innerText = "You Win 🎉"
    document.querySelector('.end-score').innerText = this.model.score;
  }

}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  startGame() {
    this.view.start.addEventListener('click', () => {
      this.view.hiddenStartModal();
      this.view.renderWord();
      this.enterPressHandler();
    })
  }

  enterPressHandler() {
    this.view.input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.view.removeWord();
        this.model.score += 10;
        this.view.updateScore();
      }

      if (this.model.score === 250) {
        this.view.showWinModal();
        this.replayGame();
      };
    })
  }

  replayGame() {
    this.view.replay.addEventListener('click', () => {
      this.view.hiddenEndModal();
      this.view.renderWord();
      this.enterPressHandler();
    })
  }
}

const dataManager = new DataManager();
const viewManager = new RainingViewManager(dataManager);
const gameController = new GameController(dataManager, viewManager);
gameController.startGame();