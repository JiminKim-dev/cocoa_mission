// getArea 함수 만들기
function getArea(shape, width, length, height) {
  switch (shape) {
    case 'circle':
      if (length !== undefined) {
        let result = 0;
        for (let i = 0; i < length; i++) {
          result += Math.trunc((width + i) * (width + i) * Math.PI);
        } 
        console.log(result);
      } else {
        console.log(Math.trunc(width * width * Math.PI)); 
      }
      break;
    case 'rect':
      console.log(width * length); 
      break;
    case 'trapezoid':
      console.log(0.5 * (width + length) * height);
      break;
  }
}


// 함수 출력
getArea('circle', 10);
getArea('rect', 10, 15);
getArea('trapezoid', 10, 15, 12);
getArea('circle', 2, 3);

// printExecutionSequence
function printExecutionSequence() {
  // 완료 못함..
}