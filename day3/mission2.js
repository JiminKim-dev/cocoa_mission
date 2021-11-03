// 1. factorial 함수
function factorial(n) {
  const factorial = [];

  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
    factorial.push(result);
  }

  return factorial
}

console.log(factorial(4));


// 2. 배열 거르기: 정규식, test, replace
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];

// for문 사용
function filterId1(peoples) {
  const reg1 = /^[a-zA-z0-9]*$/;
  const reg2 = /[0-9]/;

  const result = [];
  for (let i = 0; i < peoples.length; i++) {
    if (reg1.test(peoples[i]) === true) {
      result.push(peoples[i].replace(reg2, ''));
    }
  }
  return result;
}

console.log(filterId1(peoples));

// 고차함수 사용: filter. map
function filterId2(peoples) {
  const reg1 = /^[a-zA-z0-9]*$/;
  const reg2 = /[0-9]/;

  const results = peoples
  .filter(filter => reg1.test(filter))
  .map(rmNum => rmNum.replace(reg2, ''));

  return results;
}

console.log(filterId2(peoples));

// 3. 평균 구하기 : 다차원 배열, reduce
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

// 각 학생별 평균점수를 구하는 함수, 코드 개선 필요
function getEachAvg() {
  const arr = [];

  for (let i = 0; i < grades.length; i++) {
    let result = Math.trunc(grades[i].reduce((pre, cur) => pre + cur) / grades[i].length);
    arr.push(result);
  }
  return arr;
}

console.log(getEachAvg());