// 해시코드
function getHashCode(key, tableSize) {
  let hashCode = 0;
  for(let i = 0; i < key.length; i++) {
    hashCode += key.charCodeAt(i)
  }
  return hashCode % tableSize;
}

// 해시맵
function hashMap() {
  this.map = new Object();
  // this.storage = new Array(12); // 인덱스의 총 개수

  // put(key, value) 키-값을 추가한다.
  hashMap.prototype.put = (key, value) => {   
    this.map[key] = value;

    // 어우 복잡해 해시코드 잠시 보류
    /* 
    // getHashCode를 사용하여 반환받은 해시코드를 배열의 인덱스로 환산한다.
    const index = getHashCode(key, this.storage.length);

    // 해시충돌시...
    // index에 값이 있는지 확인: index가 비어있지않으면 push로 키와 값을 배열의 형태로 넣어준다.
    this.storage[index] != null ? 
    this.storage[index].push([key, value]) : this.storage[index] = [[key, value]];
    */
  }
  
  // remove(String key) 해당 키에 있는 값을 삭제한다.
  hashMap.prototype.remove = (key) => {
    delete this.map[key];
  }
  
  // containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  hashMap.prototype.containsKey = (key) => {
    if(!this.map[key]) {
      return false;
    } else {
      return true;
    }
  }
  
  // get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
  hashMap.prototype.get = (key) => {
    return this.map[key];
  }

  // isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  hashMap.prototype.isEmpty = () => {
    if (Object.entries(this.map).length === 0) {
      return true
    } else {
      return false
    }
  }

  // keys() 전체 키 목록을 [String] 배열로 리턴한다.
  hashMap.prototype.keys = () => {
    return Object.keys(this.map);
  }

  // replace(String key, String value) 키-값으로 기존 값을 대체한다.
  hashMap.prototype.replace = (key, value) => {
    this.map[key] = value;
  }
  // size() 전체 아이템 개수를 리턴한다.
  hashMap.prototype.size = () => {
    return Object.entries(this.map).length;
  }

  // clear() 전체 맵을 초기화한다.
  hashMap.prototype.clear = () => {
    return this.map = new Object();
  } 
}

const menu = new hashMap();

// test
menu.put('Pizza', '3000원');
menu.put('Chicken', '4000원');
menu.put('된장찌개', '1000원');
menu.put('제육덮밥', '3500원');
console.table(menu);

console.log(`해당하는 키와 매치되는 값: ${menu.get('Pizza')}`);

menu.replace('Chicken', '18000원');
menu.remove('Pizza');
console.table(menu);

console.log(menu.containsKey('Pizza'));
console.log(menu.containsKey('제육덮밥'));
console.log(menu.containsKey('까르보나라'));

console.log(`전체 키 목록: ${menu.keys()}`);
console.log(menu.keys());
console.log(`전체 아이템 개수: ${menu.size()}개`);

menu.clear();
console.log(`비어있는 맵인가요? ${menu.isEmpty()}`);
console.log(menu);

menu.put('된장찌개', '1000원');
menu.put('제육덮밥', '3500원');
console.table(menu);