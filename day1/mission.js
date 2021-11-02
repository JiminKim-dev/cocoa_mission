// 결과를 기록하는 배열
const record = [];

// getArea 함수 만들기
function getArea(shape, ...size) {
  if (shape === 'circle') {
    return getCircle(...size)
  } else if (shape === 'rect') {
    return getRectangle(...size)
  } if (shape === 'trapezoid') {
    return getTrapezoid(...size)
  }
}

function getCircle(radius, total) {
  if (total !== undefined) {
    let result = 0;
    for (let i = 0; i < total; i++) {
      result += Math.trunc((radius + i) * (radius + i) * Math.PI);
    } 
    record.push('circle');

    return result;
  } else {
    const result = Math.trunc(radius * radius * Math.PI); 
    record.push('circle');

    return result
  }
}

function getRectangle(width, length) {
  const result = width * length; 
  record.push('rect');

  return result;
}

function getTrapezoid(upper, lower, height) {
  const result = 0.5 * (upper + lower) * height;
  record.push('trapezoid');

  return result;
}

// printExecutionSequence 함수
function printExecutionSequence() {
  return record.join(' ');
}

// 함수 출력
console.log(getArea('circle', 10));
console.log(getArea('rect', 10, 15));
console.log(getArea('trapezoid', 10, 15, 12));
console.log(getArea('circle', 2, 3));
console.log(printExecutionSequence());