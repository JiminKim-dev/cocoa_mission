import wordData from "./typing_words.js"

class DataManager {
  constructor() {
    this.words = wordData;
    this.score = 0;
    this.life = 5;
  }

  shuffleWords = (arr) => {
    for (let i = this.words.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
    return arr;
  };
}

class RainingViewManager {
  constructor(model) {
    this.model = model;

    this.input = document.querySelector('.field-typing-area');
    this.field = document.querySelector('.field-raining');
    this.life = document.querySelector('.life');
  }

  resetInput() {
    return this.input.value = '';
  }

  randomPlace(e) {
    return e.style.left = `${Math.floor(Math.random() * 90)}%`;
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

    setTimeout(() => newWord.classList.add('rain'), 2000);
  }

  createWord(value) {
    const newWord = document.createElement('span');
    newWord.setAttribute('class', 'word')
    newWord.innerText = value;

    return newWord
  }

  removeWord() {
    for (let span of document.querySelectorAll('.word')) {
      if (span.innerText !== this.input.value && this.input.value !== '') {
        this.input.classList.add('error');
      } else if (this.input.value === '') {
        this.input.classList.remove('error');
      } else if (span.innerText === this.input.value) {
        span.remove();
        this.resetInput();
        this.model.score += 10;
      } 
    }
  }

  resetHeart() {
    return this.life.innerText = '';
  }

  countHeart() {
    this.resetHeart();
    for (let i = 0; i < this.model.life; i++) {
      this.life.innerText += '❤️';
    }
  }

  updateScore() {
    document.querySelector('.score').innerText = this.model.score;
  }
}

class ModalViewManager {
  constructor(model, modalView) {
    this.model = model;
    this.modalView = modalView;

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

  showOverModal() {
    this.end.classList.add('end');
    document.querySelector('.end-score').innerText = this.model.score;
  }
}

class GameController {
  constructor(model, rainingView, modalView) {
    this.model = model;
    this.rainingView = rainingView;
    this.modalView = modalView;

    this.isPause = false;
    this.timerId;
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

      this.startTouchGroundTimer()
    })
  }

  enterPressHandler() {
    this.rainingView.input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.rainingView.removeWord();
        this.rainingView.updateScore();

        if (this.model.score === this.model.words.length * 10) this.perfectGame();
      }
    })
  }

  startTouchGroundTimer() {
    this.timerId = setInterval(() => {
      if (this.isPause === false) this.touchGround();
    }, 300); 
  }

  stopTouchGroundTimer() {
    clearInterval(this.timerId);
    this.isPause = true;
  }

  touchGround() {
    const fieldBottom = this.rainingView.field.getBoundingClientRect().bottom;

    for (let child of this.rainingView.field.children) {
      if (fieldBottom === child.getBoundingClientRect().bottom && this.model.life >= 1) {
        --this.model.life;
        this.rainingView.countHeart();
        child.remove();
      } else if (this.model.life === 0) {
        this.overGame();
      }
    }
  }
  
  overGame() {
    this.stopTouchGroundTimer();
    this.modalView.showOverModal();
    this.replayGame();
  }

  perfectGame() {
    this.modalView.showWinModal();
    this.replayGame();
  }

  replayGame() {
    this.modalView.replay.addEventListener('click', () => {
      // 임시방편
      location.reload(); 

      // this.modalView.hiddenEndModal();
      // this.rainingView.renderWord();
      // this.enterPressHandler();
    })
  }
}

const dataManager = new DataManager();
const rainingViewManager = new RainingViewManager(dataManager);
const modalViewManager = new ModalViewManager(dataManager)
const gameController = new GameController(dataManager, rainingViewManager, modalViewManager);
gameController.init();