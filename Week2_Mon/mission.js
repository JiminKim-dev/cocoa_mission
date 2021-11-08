// 해시코드
function getHashCode(key, tableSize) {
  let hashCode = 0;
  for(let i = 0; i < key.length; i++) {
    hashCode += (key.charCodeAt(i))
  }
  return hashCode % tableSize;
}

// 해시맵
function hashMap() {
  this.storage = new Array(12); // 인덱스의 총 개수

  // put(key, value) 키-값을 추가한다.
  hashMap.prototype.put = (key, value) => {   
    // getHashCode를 사용하여 반환받은 해시코드를 배열의 인덱스로 환산한다.
    const index = getHashCode(key, this.storage.length);

    // 해시충돌시...
    // index에 값이 있는지 확인: index가 비어있지않으면 push로 키와 값을 배열의 형태로 넣어준다.
    this.storage[index] != null ? 
    this.storage[index].push([key, value]) : this.storage[index] = [[key, value]];
  }
}

const menu = new hashMap();

menu.put('Pizza', '3000원');
menu.put('Chicken', '4000원');
menu.put('된장찌개', '1000원');
menu.put('제육덮밥', '3500원')
menu.put('Pizza', '4000원')
console.table(menu);