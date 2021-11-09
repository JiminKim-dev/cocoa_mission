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

  // put(key, value) 키-값을 추가한다.
  hashMap.prototype.put = (key, value) => {
    return !this.map[key] ? this.map[key] = value : console.log(`${key}은(는) 이미 존재하는 값입니다.`);
  }
  
  // remove(String key) 해당 키에 있는 값을 삭제한다.
  hashMap.prototype.remove = (key) => {
    delete this.map[key];
  }
  
  // containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
  hashMap.prototype.containsKey = (key) => {
    return !this.map[key] ? false : true;
  }
  
  // get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
  hashMap.prototype.get = (key) => {
    return this.map[key];
  }

  // isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
  hashMap.prototype.isEmpty = () => {
    return Object.entries(this.map).length === 0 ? true : false;
  }

  // keys() 전체 키 목록을 [String] 배열로 리턴한다.
  hashMap.prototype.keys = () => {
    return Object.keys(this.map);
  }

  // replace(String key, String value) 키-값으로 기존 값을 대체한다.
  hashMap.prototype.replace = (key, value) => {
    return this.map[key] ? this.map[key] = value : console.log(`${key}와(과) ${value}을 대체할 값이 없습니다.`);
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
menu.put('Pizza', '6000원');

console.log(`해당하는 키와 매치되는 값: ${menu.get('Pizza')}`);

menu.replace('Chicken', '18000원');
menu.replace('마라탕', '5000원');
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