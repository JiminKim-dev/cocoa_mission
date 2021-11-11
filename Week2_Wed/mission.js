class Stack {
  constructor() {
    this.stack = []
  }

  push(element) {
    return this.stack.push(element);
  };

  pop() {
    if(this.isEmpty()) return '스택이 비었습니다.'
    return this.stack.pop()
  }

  peek() {
    if (this.isEmpty()) return '스택이 비었습니다.'
    return this.stack[this.stack.length - 1]
  }

  isEmpty() {
    return !this.stack.length
  }
}

const data = "[1,2,[3,4,[5,[6,[7,8]]]]]"
const data2 = ""; // 데이터가 존재하지 않음
const data3 = "[1,2,[3,4,[5,[6]]"  // 닫는 괄호가 하나 모자람
const data4 = "][1,2,][3,4,[5,[6]]" // 여는 괄호로 시작하지 않음

// 요구사항 1, 2
// 문제점1: 두자리 이상의 숫자도 split로 갈려버림
// 문제점2: 함수 분리 아직 못함, 내 생각도 분리 못함
function run(input) {
  const dataArr = input.split('')
  const stack = new Stack()

  let depth = 0; commaCount = 0; leftBracketsCount = 0; rightBracketsCount = 0;

  dataArr.forEach(e => {
    switch (e) {
      case '[':
        stack.push(e);
        depth++;
        leftBracketsCount++;
        break;
      case ']':
        stack.pop();
        rightBracketsCount++;
        break;
      case ',':
        commaCount++;
        break;
      default:
        return;
    }
  });

  // 에러메세지 함수를 따로 만들어야될듯
  if (leftBracketsCount !== rightBracketsCount) {
    return '괄호의 쌍이 일치하지 않습니다.';
  } else if (dataArr.length === 0) {
    return '데이터가 없습니다.'
  } else if (dataArr[0] !== '[') {
    return '여는 괄호로 시작해야됩니다.'
  } else {
    return `배열의 중첩된 깊이 수준은 ${depth}이며, 총 ${commaCount + 1}개의 원소가 포함되어 있습니다`;
  } 
}


console.log(run(data)); // 배열의 중첩된 깊이 수준은 5이며, 총 8개의 원소가 포함되어 있습니다
console.log(run(data2)); // 데이터가 없습니다.
console.log(run(data3)); // 괄호의 개수가 일치하지 않습니다.
console.log(run(data4)); // 여는 괄호로 시작해야됩니다.