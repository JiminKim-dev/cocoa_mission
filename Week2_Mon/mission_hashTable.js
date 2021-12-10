// Udemy의 "JavaScript Algorithms and Data Structures Masterclass" 강의 중 섹션 25 해시테이블 참고

class HashTable {
  constructor(size = 17) {
    this.map = new Array(size)
  }

  _hashCode(key) {
    let hashCode = 0;
    let primeNum = 27;

    for(let i = 0; i < Math.min(key.length, 50); i++) {
      let value = key.charCodeAt(i) - 23;
      hashCode = (hashCode * primeNum + value) % this.map.length;
    }
  
    return hashCode;
  }

  put(key, value) {
    let index = this._hashCode(key);
    if (!this.map[index]) this.map[index] = [];
    this.map[index].push([key, value]);
  }

  remove(key) {
    let index = this._hashCode(key);
    if (!this.map[index]) {
      return console.log(`${key}은(는) 존재하지 않는 키입니다.`);
    }

    this.map[index].map(arr => {
      if (arr[0] === key) {
        const findArr = this.map[index].indexOf(arr)
        this.map[index].splice(findArr, 1);
      }
    })
  }
  
  containsKey(key) {
    let index = this._hashCode(key);
    if (!this.map[index]) {
      return false;
    }

    return this.map[index].some(arr => arr[0] === key)
  }

  get(key) {
    let index = this._hashCode(key);
    if (!this.map[index]) {
      return `${key}은(는) 존재하지 않는 키입니다.`;
    }

    for (let arr of this.map[index]) {
      if (arr[0] === key) return arr[1];
    }
  }

  isEmpty() {
    return this.map.length === 0 ? true : false;
  }

  keys() {
    let keysArr = [];
    this.map.map(mapList => {
      mapList.forEach(i => {
        if (!i.includes(mapList[0])) keysArr.push(i[0]);
      });
    })
    return keysArr;
  }

  values() {
    let valuesArr = [];
    this.map.map(mapList => {
      mapList.forEach(i => {
        if (!i.includes(mapList[0])) valuesArr.push(i[1]);
      });
    })
    return valuesArr;
  }

  replace(key, value) {
    let index = this._hashCode(key);
    this.map[index].map(arr => {
      if (arr[0] === key) return arr[1] = value;
    })
  }

  size() {
    return this.map.length;
  }

  clear() {
    return this.map = new Array();
  }
} 

const menu = new HashTable();

//// test ////
menu.put('짜장면', '4000원');
menu.put('짬뽕', '5000원');
menu.put('미니탕수육', '10000원');
menu.put('쟁반짜장', '8000원');
menu.put('칠리새우', '30000원');

console.log(menu.get('칠리새우'));
console.log(menu.get('볶음밥'));
console.log(menu.keys());

menu.remove('칠리새우');
menu.remove('양장피')
console.log(menu.keys());

console.log(menu.containsKey('미니탕수육'));
console.log(menu.containsKey('양장피'));

console.log(menu.values());
menu.replace('미니탕수육' , '15000원');
menu.replace('쟁반짜장' , '12000원');
console.log(menu.values());
