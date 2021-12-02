import wordData from "./typing_words.js"

export default class DataManager {
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