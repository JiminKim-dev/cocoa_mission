export default class ModalViewManager {
  constructor(model, modalView) {
    this.model = model;
    this.modalView = modalView;

    this.start = document.querySelector('.game-start-btn');
    this.end = document.querySelector('.game-over-modal'); 
    this.replay = document.querySelector('.game-replay-btn');
    this.score = document.querySelector('.end-score');
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
    this.score.innerText = this.model.score;
  }

  showPerfectModal() {
    this.end.classList.add('end');
    this.end.children[0].innerText = "Perfect Score👍"
    this.score.innerText = this.model.score;
  }

  showOverModal() {
    this.end.classList.add('end');
    this.score.innerText = this.model.score;
  }
}