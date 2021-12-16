// 문제1) T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만든다.
function solution(notation, number, totalPlayer, playerNum) {
  const num = [];
  
  for(let i = 0; i < number * totalPlayer; i++) {
    num.push(...i.toString(notation))
  }

  const gildongAnswer = findPlayerAnswer(num, totalPlayer, playerNum);
  const result = printMessage(notation, number, totalPlayer, playerNum, gildongAnswer);

  return result
}

// 문제2) 길동이 차례 숫자 맞추기: 홍길동의 차례에 어떤 숫자를 말해야 하는지를 알 수 있는 프로그램을 만든다.
function findPlayerAnswer(numArr, totalPlayer, playerNum) {
  const answer = [];

  for (let j = playerNum - 1; j < numArr.length; j++) {
    if (j % totalPlayer === playerNum - 1) {
      answer.push(numArr[j]);
    }
  }
  return answer
}

function printMessage(notation, number, totalPlayer, playerNum, gildongAnswer) {
  const message = `${notation}진법으로 ${totalPlayer}명당 ${number}개의 숫자까지 말한다고 했을 때 ${playerNum}번째에 있는 길동이가 말할 숫자는 ${gildongAnswer}입니다. `;

  return message
}

console.log(solution(2, 4, 2, 2));
console.log(solution(8, 6, 2, 2));
console.log(solution(16, 4, 3, 2));