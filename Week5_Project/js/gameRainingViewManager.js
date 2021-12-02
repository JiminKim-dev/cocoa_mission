export default class RainingViewManager {
  constructor(model) {
    this.model = model;

    this.input = document.querySelector('.field-typing-area');
    this.field = document.querySelector('.field-raining');
    this.life = document.querySelector('.life');
  }

  disableInput() {
    return this.input.disabled = true;
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