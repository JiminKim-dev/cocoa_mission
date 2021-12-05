const getAreaFunction = require('./mission');

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const question = () => {
  rl.question(`넓이를 구하고 싶은 도형을 입력하세요 (원, 사각형, 사다리꼴 중 선택): `, (shape) => {
    switch(shape) {
      case '원':
        readCircle(shape);
      break;
      case '사각형':
        readRectangle(shape);
      break;
      case '사다리꼴':
        readTrapezoid(shape);
      break;
      default:
        console.log('원, 사각형, 사다리꼴의 넓이만 구할 수 있습니다.');
        question();
    }
  });
}

const readCircle = (shape) => {
  rl.setPrompt(`구하고 싶은 ${shape}의 반지름을 입력하세요.
만약 반지름 n 부터 m 까지의 원의 넓이의 총합을 구하고 싶으면 n과 m을 띄어쓰기해서 입력하세요: `);
  rl.prompt();
  rl.on('line', (size) => {
    const sizeParamaters = size.split(' ').map(el => parseInt(el));
    if (sizeParamaters < 1) {
      console.log('반지름의 크기를 1 이상으로 입력해 주세요.');
      rl.close();
    } else if (sizeParamaters.length === 1) {
      console.log(`${shape}의 넓이는 ${getAreaFunction.getArea(shape, sizeParamaters[0])}입니다.`); 
      rl.close();
    } else {
      console.log(`반지름 ${sizeParamaters[0]} 부터 ${sizeParamaters[1]} 까지의 원의 넓이의 총합은 ${getAreaFunction.getArea(shape, ...sizeParamaters)}입니다.`); 
      rl.close();
    }
  })
}

const readRectangle = (shape) => {
  rl.setPrompt(`구하고 싶은 ${shape}의 가로변과 세로변을 입력하세요: `);
  rl.prompt();
  rl.on('line', (size) => {
    const sizeParamaters = size.split(' ').map(el => parseInt(el));
    if([...sizeParamaters] < 1) {
      console.log('가로변 또는 세로변의 길이는 1 이상이어야 합니다.');
      rl.close();
    } else {
      console.log(`${shape}의 넓이는 ${getAreaFunction.getArea(shape, ...sizeParamaters)} 입니다.`);
      rl.close();
    }        
  });
}

const readTrapezoid = (shape) => {
  rl.setPrompt(`구하고 싶은 ${shape}의 윗변과 밑변과 높이를 순서대로 입력하세요: `);
  rl.prompt();
  rl.on('line', (size) => {
    const sizeParamaters = size.split(' ').map(el => parseInt(el));
    if([...sizeParamaters] < 1) {
      console.log('윗변과 밑변의 길이와 높이는 1 이상이어야 합니다.');
      rl.close();
    } else {
      console.log(`${shape}의 넓이는 ${getAreaFunction.getArea(shape, ...sizeParamaters)} 입니다.`);
      rl.close();
    }        
  });
}

question();