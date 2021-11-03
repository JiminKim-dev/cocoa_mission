// 모양과 넓이를 저장할 배열을 추가함
const record = [];

// getArea 함수
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

  record.push(`${shape} ${result}`);
  return result
}

// 원의 넓이, 원의 넓이의 총합
function getCircle(radius, total) {
  if (total !== undefined) {
    let result = 0;
    for (let i = 0; i < total; i++) {
      result += Math.trunc((radius + i) * (radius + i) * Math.PI);
    }
    return result;
  } else {
    const result = Math.trunc(radius * radius * Math.PI);
    return result
  }
}

// 사각형의 넓이
function getRectangle(width, length) {
  const result = width * length; 
  return result;
}

// 사다리꼴의 넓이
function getTrapezoid(upper, lower, height) {
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
console.log(getArea('circle', 10));
console.log(getArea('rect', 10, 15));
console.log(getArea('trapezoid', 10, 15, 12));
console.log(getArea('circle', 2, 3));
printExecutionSequence();
