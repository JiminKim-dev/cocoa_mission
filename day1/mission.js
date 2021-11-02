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
    return result;
  } else {
    return Math.trunc(radius * radius * Math.PI); 
  }
}

function getRectangle(width, length) {
  const result = width * length; 
  return result;
}

function getTrapezoid(upper, lower, height) {
  const result = 0.5 * (upper + lower) * height;
  return result;
}

// 함수 출력
console.log(getArea('circle', 10));
console.log(getArea('rect', 10, 15));
console.log(getArea('trapezoid', 10, 15, 12));
console.log(getArea('circle', 2, 3));

// printExecutionSequence
function printExecutionSequence() {
  // 완료 못함..
}