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

    this.width = this.field.offsetWidth;
    this.height = this.field.offsetHeight;
  }

  resetInput() {
    this.input.value = '';
  }

  hiddenStartModal() {
    document.querySelector('.game-start-modal').classList.add('start');
  }

  randomPlace(e) {
    e.style.left = `${(Math.floor(Math.random() * 90))}%`;
  }

  renderWord(value) {
    const addWord = this.createWord(value);

    this.randomPlace(addWord);
    this.field.appendChild(addWord);

    setTimeout(() => { 
      addWord.classList.add('rain');
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
}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  startGame() {
    this.view.start.addEventListener('click', () => {
      this.view.hiddenStartModal();

      const words = this.model.shuffleWords(this.model.words);
      for(let i = 0; i < words.length; i++) {
        (x => { 
          setTimeout(() => this.view.renderWord(words[x]), 2000 * x);
        })(i);
      }

      this.enterPressHandler();
    })
  }

  enterPressHandler() {
    this.view.input.addEventListener('keypress', (e) => {
      if (e.keyCode == 13) {
        this.view.removeWord();
        this.model.score += 10;
        this.view.updateScore();
      }
    })
  }
}

const dataManager = new DataManager();
const viewManager = new RainingViewManager(dataManager);
const gameController = new GameController(dataManager, viewManager);
gameController.startGame();