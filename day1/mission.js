// 결과를 기록하는 obj에 모양을 저장할 배열과 넓이를 저장할 배열을 추가함
const record = {
  'shape': [],
  'area' : []
};

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

// 원의 넓이, 원의 넓이의 총합
function getCircle(radius, total) {
  if (total !== undefined) {
    let result = 0;
    for (let i = 0; i < total; i++) {
      result += Math.trunc((radius + i) * (radius + i) * Math.PI);
    } 
    record.shape.push('circle');
    record.area.push(result);

    return result;
  } else {
    const result = Math.trunc(radius * radius * Math.PI); 
    record.shape.push('circle');
    record.area.push(result);

    return result
  }
}

// 사각형의 넓이
function getRectangle(width, length) {
  const result = width * length; 
  record.shape.push('rect');
  record.area.push(result);

  return result;
}

// 사다리꼴의 넓이
function getTrapezoid(upper, lower, height) {
  const result = 0.5 * (upper + lower) * height;
  record.shape.push('trapezoid');
  record.area.push(result);

  return result;
}

// printExecutionSequence 함수
function printExecutionSequence() {
  for (let i = 0; i < record.shape.length; i++) {
    console.log(`${record.shape[i]} ${record.area[i]}`);
  }
}

// 함수 출력
console.log(getArea('circle', 10));
console.log(getArea('rect', 10, 15));
console.log(getArea('trapezoid', 10, 15, 12));
console.log(getArea('circle', 2, 3));
printExecutionSequence();