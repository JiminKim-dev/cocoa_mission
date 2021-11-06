# 스터디 로그

## 구현하면서 생긴 변경사항

### forEach와 map 

#### [1. for문을 사용한 기존 코드](https://github.com/JiminKim-dev/cocoa_mission/commit/a56947414274bcc504479afb64570a7ad09bcb13#diff-23899ff2dc907164431d4bee2370e33f3b3cc56f9d88def4ee83a6897f93af54)
```JS
// [3. 평균 구하기](https://github.com/JiminKim-dev/cocoa_mission/commit/ccaba5286ee06179d285f860913478953c1e5174#diff-23899ff2dc907164431d4bee2370e33f3b3cc56f9d88def4ee83a6897f93af54)
function getEachAvg(grades) {
  const result = [];
  for (let i = 0; i < grades.length; i++) {
    result.push(getAvg(grades[i]));
  }
  return result;
}
```
#### [2. for문을 forEach로 변경](https://github.com/JiminKim-dev/cocoa_mission/commit/ccaba5286ee06179d285f860913478953c1e5174#diff-23899ff2dc907164431d4bee2370e33f3b3cc56f9d88def4ee83a6897f93af54)


```js
// 3. 평균 구하기
function getEachAvg(grades) {
  const result = [];
  grades.forEach(grades => {
    result.push(Math.trunc(getAvg(grades)))
  })
  return result;
}
```
각 학생의 평균점수를 구하는 함수 안의 for문을 개선하기 위해 forEach를 사용했다. 이전에 작성했던 for문과 큰 차이없이 빈 배열에 push하는 방법을 택했다. 

#### [3. forEach를 map으로 변경](https://github.com/JiminKim-dev/cocoa_mission/commit/dee68cdbf0f7b2cd8406f33c1617a38a1a81363f#diff-23899ff2dc907164431d4bee2370e33f3b3cc56f9d88def4ee83a6897f93af54)
```js
// 3. 평균 구하기
function getEachAvg(grade) {
  return grade.map(grade => Math.trunc(getAvg(grade)))
}
```
  고차함수 map를 사용하면 빈 배열에 일일이 push하는 방법을 사용하지 않고도 함수의 결과를 모아 새로운 배열을 리턴할 수 있기 때문에 map으로 변경해주었다.



### [함수명/배열명과 동일한 변수명과 매개변수명](https://github.com/JiminKim-dev/cocoa_mission/commit/a56947414274bcc504479afb64570a7ad09bcb13#diff-23899ff2dc907164431d4bee2370e33f3b3cc56f9d88def4ee83a6897f93af54)

코드리뷰를 받으면서 조언 받았던 부분이다.

#### 함수명과 동일한 지역변수명
```js
// 1. factorial 함수
function factorial(n) {
  const factorial = [];
 /* 이하 생략 */
  return factorial
}
```

  #### 배열명과 동일한 매개변수명
```js
// 2. 배열 거르기
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

function filterId1(peoples) {
  const result = [];
  for (let i = 0; i < peoples.length; i++) {
     /* 이하 생략 */
  }
```

코드는 정상적으로 작동하지만 좋은 변수명이 아니다. 추후에 문제가 생길 수도 있으니까 함수명과 배열명에 겹치지 않는 [좀 더 의미있는 이름로 바꿔주었다.](https://github.com/JiminKim-dev/cocoa_mission/commit/4c0f7a4432294c596e31f0b3721a66297922895a#diff-770332a0a44b8a50e404130b8b553d196b913cc14436d74c1f4acbe128c5e0d4)

### 화살표 함수
화살표 함수 또한 코드리뷰를 받으면서 조언 받았던 부분이다.

#### 변경 전

```js
// 2. 배열 거르기
function filterId2(peoples) {
  const result = peoples
  .filter(filter => regCharNum.test(filter))
  .map(rmNum => rmNum.replace(/[0-9]/, ''));

  return result;
}
```

```js
// 3. 평균 구하기
function getAvg(arr) {
  const result = arr.reduce((pre, cur) => pre + cur) / arr.length;
  return result
}
```
[기존에 작성했던 코드들](https://github.com/JiminKim-dev/cocoa_mission/blob/db2967e53fa957556ca361c6d0d5bdfb4eac4e9a/day3/mission2.js)은 함수 선언문 안에 따로 변수 result를 만들어서 식을 작성하고 다시 그 result를 리턴하는 방식으로 작성했다.

#### 변경 후

```js
// 2. 배열 거르기
const filterId2 = (id) => { 
  return id.filter(filter => regCharNum.test(filter))
  .map(rmNum => rmNum.replace(/[0-9]/, ''));
}
```

```js
// 3. 평균 구하기
const getAvg = (arr) => {
  return arr.reduce((pre, cur) => pre + cur) / arr.length;
}
```

대신 화살표 함수는 함수 선언문에서는 사용이 불가능하고 함수 표현식에서만 사용할 수 있기 때문에 기존 함수를 함수 표현식의 형태로 변경한 뒤 [화살표 함수](https://github.com/JiminKim-dev/cocoa_mission/commit/4c0f7a4432294c596e31f0b3721a66297922895a#diff-23899ff2dc907164431d4bee2370e33f3b3cc56f9d88def4ee83a6897f93af54)를 작성했다.


---


## 추가로 구현해볼것
- [ ] 2-1 팩토리얼 함수를 재귀함수로 구현하기   
- [ ] 2-2 정규식의 일치여부를 함수로 분리하기   
- [ ] 2-5 결과값을 담는 배열 result를 전역변수가 아닌 지역변수로 변경하기
