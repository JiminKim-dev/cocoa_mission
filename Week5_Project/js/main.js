import wordData from "./typing_words.js"

class DataManager {
  constructor() {
    this.words = wordData;
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

  hiddenModal() {
    document.querySelector('.game-start-modal').classList.add('start');
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
    newWord.innerText = value;

    return newWord
  }

  randomPlace(e) {
    e.style.left = `${(Math.floor(Math.random() * 90))}%`;
  }
}

class GameController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  startGame() {
    this.view.start.addEventListener('click', () => {
      this.view.hiddenModal();

      const words = this.model.shuffleWords(this.model.words);
      for(let i = 0; i < words.length; i++) {
        (x => { 
          setTimeout(() => this.view.renderWord(words[x]), 2000 * x);
        })(i);
      }
    })
  }
}

const dataManager = new DataManager();
const viewManager = new RainingViewManager(dataManager);
const gameController = new GameController(dataManager, viewManager);
gameController.startGame();