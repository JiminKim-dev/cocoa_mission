export default class SoundManager {
  constructor() {
    this.mismatch =document.querySelector('#mismacth');
    this.match = document.querySelector('#startSound');
    this.gameOver = document.querySelector('#gameOverSound');
    this.gameWin = document.querySelector('#gameWinSound');
  }

  mismatchSound() {
    return this.mismatch.play();
  }

  matchSound() {
    return this.match.play();
  }

  gameOverSound() {
    this.mismatch.pause();
    this.gameOver.play();
  }

  gameWinSound() {
    this.match.pause();
    this.gameWin.play();
  }
}