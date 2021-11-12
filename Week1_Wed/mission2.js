// ----------------- 1. factorial 함수 -----------------
function factorial(m) {
  const resultArr = [];

  let result = 1;
  for (let i = 1; i <= m; i++) {
    result *= i;
    resultArr.push(result);
  }

  return resultArr;
}

console.log(factorial(4));


// ----------------- 2. 배열 거르기: 정규식, test, replace -----------------
const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
const regCharNum = /^[a-zA-z0-9]*$/;

// for문 사용
function filterId1(id) {
  const result = [];
  for (let i = 0; i < id.length; i++) {
    if (regCharNum.test(id[i])) {
      result.push(id[i].replace(/[0-9]/, ''));
    }
  }
  return result;
}

console.log(filterId1(peoples));

// 고차함수 사용: filter. map
const filterId2 = (id) => { 
  return id.filter(filter => regCharNum.test(filter))
  .map(rmNum => rmNum.replace(/[0-9]/, ''));
}

console.log(filterId2(peoples));

// ----------------- 3. 평균 구하기 : 다차원 배열, reduce -----------------
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

// 배열의 평균을 구하는 함수
const getAvg = (arr) => {
  return arr.reduce((pre, cur) => pre + cur) / arr.length;
}

// 3-1 각 학생의 평균점수를 구하는 함수
function getEachAvg(grade) {
  return grade.map(grade => Math.trunc(getAvg(grade)))
}

console.log(getEachAvg(grades));

// 3-2 모든 학생의 최고점수의 평균 점수 출력하기
function getMaxAvg(grade) {
  const maxGrade = grade.map(grade => Math.max(...grade));
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
const jsonData = JSON.parse(fs.readFileSync('./Week1_Wed/mission2-5.json', 'utf8'));

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

// ----------------- 6. reduce 만들기 -----------------
const testData = [2, 4, 6, 8]
const myReduce = (arr, callback, initialValue) => {
  arr.forEach(cur => {
    initialValue = callback(initialValue, cur)
  });
  return initialValue;
}

const add = (prev, next) => prev + next;

console.log(`myReduce의 결과는: '${myReduce(testData, add, 0)}' 입니다.`);