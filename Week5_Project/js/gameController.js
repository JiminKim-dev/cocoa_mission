export default class GameController {
  constructor(model, rainingView, modalView, sound) {
    this.model = model;
    this.rainingView = rainingView;
    this.modalView = modalView;
    this.sound = sound;

    this.isPause = false;
    this.timerId;
  }

  init() {
    this.rainingView.countHeart();
    this.startGame();
  }

  startGame() {
    this.modalView.start.addEventListener('click', () => {
      this.sound.matchSound();
      this.modalView.hiddenStartModal();
      this.rainingView.renderWord();
      this.enterPressHandler();

      this.startTouchGroundTimer();
    })
  }

  enterPressHandler() {
    this.rainingView.input.addEventListener('keypress', (e) => {
      if (e.keyCode === 13) {
        this.rainingView.removeWord();
        this.rainingView.updateScore();

        const perfectScore = this.model.words.length * 10;
        if (this.rainingView.field.innerHTML === '' && this.model.score !== perfectScore) {
          this.winGame();
        } else if (this.model.score === perfectScore) {
          this.perfectGame();
        }

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
        this.sound.mismatchSound();
        child.remove();
      } else if (this.model.life === 0) {
        this.overGame();
      }
    }
  }
  
  overGame() {
    this.stopTouchGroundTimer();
    this.sound.gameOverSound();
    this.modalView.showOverModal();
    this.rainingView.disableInput();
    this.replayGame();
  }

  perfectGame() {
    this.sound.gameWinSound();
    this.modalView.showPerfectModal();
    this.rainingView.disableInput();
    this.replayGame();
  }
  
  winGame() {
    this.sound.gameWinSound();
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