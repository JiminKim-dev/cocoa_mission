// 문제1) T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만든다.
function solution(n, t, m) {
  const arr = [];
  for(let i = 0; i < t * m; i++) {
    let num = i.toString(n)
    arr.push(...num)
  }
  return arr
}
console.log(solution(2, 4, 2));