export default class GameController {
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
    this.rainingView.disableInput();
    this.replayGame();
  }

  perfectGame() {
    this.modalView.showWinModal();
    this.rainingView.disableInput();
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