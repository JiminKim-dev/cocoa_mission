export default class ModalViewManager {
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