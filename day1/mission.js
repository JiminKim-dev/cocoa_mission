// getArea 함수 만들기
function getArea(figure, width, length, height) {
  switch (figure) {
    case 'circle':
      for (let i = 0; i < length; i++) {
        const result = (width + i) * (width + i) * Math.round(Math.PI);

        //result의 총합을 어떻게 구하지..
        console.log(result);
      }
      break;
    case 'ract':
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