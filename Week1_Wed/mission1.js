// 문제1) T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만든다.
function solution(notation, t, m) {
  const printNum = [];
  for(let i = 0; i < t * m; i++) {
    printNum.push(...i.toString(notation))
  }
  return printNum
}
console.log(solution(2, 4, 2));

// 문제2) 길동이 차례 숫자 맞추기: 홍길동의 차례에 어떤 숫자를 말해야 하는지를 알 수 있는 프로그램을 만든다.

