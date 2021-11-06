# 스터디 로그

## 구현하면서 생긴 문제점과 해결과정

### forEach와 map 
```JS
function getEachAvg(grades) {
  const result = [];
  for (let i = 0; i < grades.length; i++) {
    result.push(getAvg(grades[i]));
  }
  return result;
}
```
3번 문제에서 각 학생의 평균점수를 구하는 함수 안의 for문을 개선하기 위해 [forEach](https://github.com/JiminKim-dev/cocoa_mission/commit/ccaba5286ee06179d285f860913478953c1e5174#diff-770332a0a44b8a50e404130b8b553d196b913cc14436d74c1f4acbe128c5e0d4)를 사용했다.

```js
function getEachAvg(grades) {
  const result = [];
  grades.forEach(grades => {
    result.push(Math.trunc(getAvg(grades)))
  })
  return result;
}
```
이전에 작성했던 for문과 큰 차이없이 빈배열에 push하는 방법을 택했다. 

```js
function getEachAvg(grade) {
  return grade.map(grade => Math.trunc(getAvg(grade)))
}
```
  그러나 map 메서드를 사용하면 빈배열에 일일이 push하는 방법을 사용하지 않고도 함수의 결과를 모아 새로운 배열을 리턴하기 떄문에 map으로 변경해주었다.



### 함수명/배열명과 동일한 변수명과 매개변수명

코드리뷰를 받으면서 조언 받았던 부분이다.

#### 함수명과 동일한 지역변수명
```js
function factorial(n) {
  const factorial = [];
 /* 이하 생략 */
  return factorial
}
```

  #### 배열명과 동일한 매개변수명
```js
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

function filterId1(peoples) {
  const result = [];
  for (let i = 0; i < peoples.length; i++) {
     /* 이하 생략 */
  }
```

코드는 정상적으로 작동하지만 좋은 변수명이 아니다. 추후에 문제가 생길 수도 있으니까 겹치지 않고 좀 더 의미있는 이름로 바꿔주었다.


---


## 추가로 구현해볼것
[] 1. 팩토리얼 함수를 재귀함수로 구현하기   
[] 2. 정규식의 일치여부를 함수로 분리하기   
[] 5. 결과값을 담는 배열 result를 전역변수가 아닌 지역변수로 변경하기

