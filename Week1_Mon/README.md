# 학습 체크 포인트

- [x] Node.js를 통해서 JavaScript개발을 할 수 있다. 
- [x] 함수의 역할은 한가지에 집중하고 있다. 
- [x] 일관된 변수명과 함수이름을 짓고 있다. 
- [x] 함수는 늘 동일한 입력값에 동일한 출력을 보장한다.
- [x] 개발과정에서 breakpoint나 'debugger;' 키워드를 사용해서 디버깅을 했다. 

## 구현하면서 생긴 문제점과 해결 과정

### getArea 함수

1. return을 사용하면 switch 문의 break가 작동하지 않아서 [console.log를 사용](https://github.com/JiminKim-dev/kokoa_mission/commit/1aedddd115ec80a945a065d048fed7a75768fc30#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)했다. 

~~👉 switch문을 [if else문](https://github.com/JiminKim-dev/kokoa_mission/commit/bd2d6d16e8fbb16c564b320914bcc53a0de9c0c6#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)으로 변경하여 return을 사용했다.~~   
👉👉 다시 [switch문](https://github.com/JiminKim-dev/kokoa_mission/commit/55ee0d7e5ec591562eb53f1687b18c5d5c11931a#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)으로 변경함, 대신 return을 switch문 안에 넣지 않고 밖으로 뺐다.

2. [매개변수 이름의 오류](https://github.com/JiminKim-dev/kokoa_mission/commit/8e9a4abd8960689ee85f21f73cb064a89e69c917#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d) (shape, **width,** length, height)

원의 넓이를 구하기 위해선 **반지름**이 필요함 case 'circle' 에서 width는 적합하지 않음  

그리고 모든 case가 매개변수 width, length, height를 다 사용하는 것은 아니다. 

👉 getArea안에 있던 식을 각각 도형의 함수(getCircle, getRectangle, getTrapezoid)로 [분리](https://github.com/JiminKim-dev/kokoa_mission/commit/bd2d6d16e8fbb16c564b320914bcc53a0de9c0c6#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)했다.

### 잘못된 객체 사용법 ([스스로 불러온 재앙](https://github.com/JiminKim-dev/kokoa_mission/commit/eefb4aaad02c6425f1a791fff8d43bca859a2a8e#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d))
```JS
const record = {
  'shape': [],
  'area' : []
};
```

```JS
function getRectangle(width, length) {
  const result = width * length; 
  record.shape.push('rect');
  record.area.push(result);

  return result;
}
```
이런식으로 모양과 넓이를 따로 저장하는 방법을 선택했다.

```JS
function printExecutionSequence() {
  for (let i = 0; i < record.shape.length; i++) {
    console.log(`${record.shape[i]} ${record.area[i]}`);
  }
}
```
그래서 printExecutionSequence 함수도 괴상한 방법으로 출력되도록 구현을 했었다.

### 잘못된 객체 사용법의 해결 방안과 [코드 개선](https://github.com/JiminKim-dev/kokoa_mission/commit/55ee0d7e5ec591562eb53f1687b18c5d5c11931a#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)

1. 객체를 배열로 변경함 👉 `const record = [];`
2. 배열에 리터럴 문자열로 값을 저장
```JS
function getRectangle(width, length) {
  const result = width * length; 
  record.push(`rect: ${result}`);
  return result;
}
```

처음부터 리터럴 문자열로 값을 저장했으면 굳이 객체를 이상하게 쓰는 오류가 없었을 것이다 🥲

3. printExecutionSequence 함수 수정

```JS
function printExecutionSequence() {
  record.forEach(results => {
    console.log(results);
  });
}
```
배열을 문자열로 변환하는 메서드 forEach를 사용했다.

4. getArea 함수 개선

각 도형 함수안에서 일일이 push를 했기 때문에 조금 비효율적이라고 느껴졌다.

```JS
function getArea(shape, ...size) {
  let result = '';
  switch (shape) {
    case 'circle':
      result = getCircle(...size);
      break;
    case 'rect':
      result = getRectangle(...size);
      break;
    case 'trapezoid':
      result = getTrapezoid(...size);
      break;
    default:
      console.log('원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.'); 
  }
  return record.push(`${shape}: ${result}`)
}
```
그래서 변수 result에 도형 함수에서 리턴한 값을 부여해서 shape와 같이 배열에 저장되도록 수정하였다.

5. getArea 오류 수정

console.log로 getArea 함수를 출력하면 값이 아닌 [순서가 출력되는 오류](https://github.com/JiminKim-dev/kokoa_mission/commit/55ee0d7e5ec591562eb53f1687b18c5d5c11931a#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)가 발생했다.
```JS
function getArea(shape, ...size) {
  let result = '';
  switch (shape) {
    case 'circle':
      result = getCircle(...size);
      break;
  /* 이하 생략 */

  }

  record.push(`${shape} ${result}`);
  return result
}
```
push를 먼저하고 결과를 반환하도록 수정했다.

### 치명적이진 않지만 사소한 오류(실수)

1. [코드는 정상적으로 작동하나 마지막에 undefined가 출력되는 현상](https://github.com/JiminKim-dev/kokoa_mission/commit/a5f66ad46512e7fa9ce3373a71fe1586165e21e4#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d)
```JS
console.log(printExecutionSequence()); 
```
👉  **코드리뷰를 통해 해결👍**

콘솔로그를 중복해서 사용했기 때문에 발생한 오류였다.

2. [오타](https://github.com/JiminKim-dev/kokoa_mission/commit/89bd78ec5e62dea567329c2ee7fd0448579131cf#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d) 👉` case 'ract':`


3. 조건문 오류
```JS
else if (shape === 'rect') {
    return getRectangle(...size)
  } if (shape === 'trapezoid') {
    return getTrapezoid(...size)
  }
```
[else if 다음에 if를 넣는 실수](https://github.com/JiminKim-dev/kokoa_mission/commit/bd2d6d16e8fbb16c564b320914bcc53a0de9c0c6#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d) 를 수정하다가 [else에 조건을 넣는 실수](https://github.com/JiminKim-dev/kokoa_mission/commit/6bfceaaf8db2e36912b2fc0217e76efb1487f6f9#diff-8e7b8b0bb91d94c103ed0288e63e90a57a4ef5fbbaf2a05e85b0eb3866e2fd3d) 를 저질렀다. 👀



👉 사소한 실수를 수정하기 위한 잦은 커밋을 방지하기 위해 코드를 꼭 꼼꼼히 살펴봐야겠다

### break와 return의 차이

#### break
```js
function getArea(shape, ...size) {
  let result = '';
  switch (shape) {
    // 이하 생략
    default:
      console.log('원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.'); 
	  break;
  }

  record.push(`${shape} ${result}`);
  return result
}
```

```
> 원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.
> star
```
`getArea('star', 2)` 라는 입력값을 주면 에러메세지만 뜨는게 아니라 shape도 같이 출력이 되는 오류가 생겼다.

👉 _[break](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/break)를 쓰면 함수가 완전히 끝나는게 아니라 해당 switch문 만 종료되고 다음 문으로 넘어간다._


#### return
```js
function getArea(shape, ...size) {
  let result = '';
  switch (shape) {
    // 이하 생략
    default:
      return console.log('원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.'); 
  }

  record.push(`${shape} ${result}`);
  return result
}
```
```
> 원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.
```
해당 오류는 break 대신 return으로 수정하니까 정상적으로 출력됐다.

👉 _[return 명령문](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/return)은 함수 실행을 종료하고, 주어진 값을 함수 호출 지점으로 반환한다._

