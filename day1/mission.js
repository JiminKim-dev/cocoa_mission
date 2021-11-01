// getArea 함수 만들기
function getArea(shape, width, length, height) {
  switch (shape) {
    case 'circle':
      if (length !== undefined) {
        const arr = [];
        for (let i = 0; i < length; i++) {
          const result = Math.trunc((width + i) * (width + i) * Math.PI);
          arr.push(result);
        } 

        const sum = arr.reduce((a, b) => a + b);
        console.log(sum);
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
getArea('ract', 10, 15);
getArea('trapezoid', 10, 15, 12);
getArea('circle', 2, 3);

// printExecutionSequence
function printExecutionSequence() {

}