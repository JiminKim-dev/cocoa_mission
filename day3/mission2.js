// ----------------- 1. factorial 함수 -----------------
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


// ----------------- 2. 배열 거르기: 정규식, test, replace -----------------
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
const regCharNum = /^[a-zA-z0-9]*$/;

// for문 사용
function filterId1(peoples) {
  const result = [];
  for (let i = 0; i < peoples.length; i++) {
    if (regCharNum.test(peoples[i])) {
      result.push(peoples[i].replace(/[0-9]/, ''));
    }
  }
  return result;
}

console.log(filterId1(peoples));

// 고차함수 사용: filter. map
function filterId2(peoples) {
  const result = peoples
  .filter(filter => regCharNum.test(filter))
  .map(rmNum => rmNum.replace(/[0-9]/, ''));

  return result;
}

console.log(filterId2(peoples));

// ----------------- 3. 평균 구하기 : 다차원 배열, reduce -----------------
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

// 배열의 평균을 구하는 함수
function getAvg(arr) {
  const result = arr.reduce((pre, cur) => pre + cur) / arr.length;
  return result
}

// 3-1 각 학생의 평균점수를 구하는 함수
function getEachAvg(grades) {
  const result = [];
  grades.forEach(grades => {
    result.push(Math.trunc(getAvg(grades)))
  })
  return result;
}

console.log(getEachAvg(grades));

// 3-2 모든 학생의 최고점수의 평균 점수 출력하기
function getMaxAvg(grades) {
  const maxGrade = [];
  grades.forEach(grades => {
    maxGrade.push(Math.max(...grades))
  });
  return getAvg(maxGrade);
}

console.log(getMaxAvg(grades));

// ----------------- 4. 배열 만들기 -----------------
const data = {
  "debug": "on",
  "window": {
      "title": "Sample Konfabulator Widget",
      "name": "main_window",
      "width": 500,
      "height": 500
  },
  "image": { 
      "src": "Images/Sun.png",
      "name": "sun1",
      "hOffset": 250,
      "vOffset": 250,
      "alignment": "center"
  },
  "text": {
      "data": "Click Here",
      "size": 36,
      "style": "bold",
      "name": "text1",
      "hOffset": 250,
      "vOffset": 100,
      "alignment": "center",
      "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
  }
}

function numberTypeData(data) {
  const arr = [];
  for (const key in data) {
    Object.entries(data[key]).forEach(([key, value]) => {
      if (typeof value === 'number') {
        arr.push(key);
      } 
    });
  }
  return arr;
}

console.log(numberTypeData(data));

// ----------------- 5. 배열 결과 출력 -----------------
// json 파일을 불러오기 (동기)
const fs = require('fs');
const jsonData = JSON.parse(fs.readFileSync('./day3/mission2-5.json', 'utf8'));

const result = [];
function findData(data) {
  data.forEach(obj => {
    if (obj['type']  === 'sk') {
      result.push(obj['name']);
    }
    if (typeof obj['childnode'] === 'object') {
      findData(obj['childnode']);
    }
  }); 
  
  return result;
}
console.log(findData(jsonData));