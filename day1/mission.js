// getArea 함수 만들기
function getArea(figure, width, length, height) {
  switch (figure) {
    case 'circle':
      // 세번째 매개변수의 값이 존재하면 
      // 반지름이 1부터 세번째 매개변수의 값까지 1씩 증가하면서, 원의 넓이의 모든 합을 출력한다.
      if (length !== undefined) {
        // 배열을 생성하여 for문의 결과를 배열에 저장한다.
        const arr = [];
        for (let i = 0; i < length; i++) {
          const result = Math.trunc((width + i) * (width + i) * Math.PI);
          arr.push(result);
        } 

        // 배열의 합계를 구한다.
        const sum = arr.reduce((a, b) => a + b);
        console.log(sum);
      } else {
        // 세번째 매개변수의 값이 존재하지 않으면 원의 넓이만 출력한다.
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
console.log('--------');

getArea('ract', 10, 15);
console.log('--------');

getArea('trapezoid', 10, 15, 12);
console.log('--------');

getArea('circle', 2, 3);

// printExecutionSequence
function printExecutionSequence() {

}