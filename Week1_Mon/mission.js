// 모양과 넓이를 저장할 배열을 추가함
const record = [];

// getArea 함수
function getArea(shape, ...size) {
  let result = '';
  switch (shape) {
    case 'circle':
      if (size[1] !== undefined) {
        result = getIncreaseCircleArea(...size);
        break;
      }
      result = getCircleArea(...size); 
      break;
    case 'rect':
      result = getRectangleArea(...size);
      break;
    case 'trapezoid':
      result = getTrapezoidArea(...size);
      break;
    default:
      return console.log('원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.'); 
  }

  record.push(`${shape} ${result}`);
  return result
}


// 원의 넓이
function getCircleArea(radius) {
  const result = Math.trunc(radius * radius * Math.PI);
  return result
}

// 원의 넓이의 총합
function getIncreaseCircleArea(radius, total) {
  let result = 0;
  for (let i = 0; i < total; i++) {
    result += Math.trunc((radius + i) * (radius + i) * Math.PI);
  }
  return result;
}

// 사각형의 넓이
function getRectangleArea(width, length) {
  const result = width * length; 
  return result;
}

// 사다리꼴의 넓이
function getTrapezoidArea(upper, lower, height) {
  const result = 0.5 * (upper + lower) * height;
  return result;
}

// printExecutionSequence 함수: 배열 record를 출력함
function printExecutionSequence() {
  record.forEach(results => {
    console.log(results);
  });
}

// 함수 출력
getArea('circle', 10);
getArea('rect', 10, 15);
getArea('trapezoid', 10, 15, 12);
getArea('circle', 2, 3);
getArea('star', 2)
printExecutionSequence();
