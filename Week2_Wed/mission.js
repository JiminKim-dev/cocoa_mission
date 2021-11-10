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

// 요구사항 1만 구현
function run(input) {
  const data = input.replace(/,/gi, '').split('');
  const stack = new Stack()
  let depth = 0;
  let elements = 0;

  data.forEach(e => {
    switch (e) {
      case '[':
        stack.push(e);
        depth++;
        break;
      case ']':
        stack.pop();
        break;
      default:
        elements++;
        return;
    }
  });

  return `배열의 중첩된 깊이 수준은 ${depth}이며, 총 ${elements}개의 원소가 포함되어 있습니다.`
}

const data = "[1,2,[3,4,[5,[6]]]]"
console.log(run(data));