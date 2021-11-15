const data = [
  89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77,
  84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01
]

// 평균 구하기
const getMean = (arr) => {
  return arr.reduce((pre, cur) => pre + cur) / arr.length;
}

// 편차: 변량 - 평균, 편차 제곱: Math.pow
const getDeviationPow = (arr) => {
  return arr.map(e => Math.pow(e - getMean(arr), 2));
}

// 분산: 편차 제곱 평균
// 표준편차: 분산의 제곱근 (Math.sqrt)
function getStandardDeviation(arr) {
  const deviationPow = getDeviationPow(arr);
  const standardDeviation = Math.sqrt(getMean(deviationPow));
  return standardDeviation
}

// 표준화
function getNormalDistribution(x) {
  return ((x - getMean(data)) / getStandardDeviation(data)).toFixed(2);
}

console.log(getNormalDistribution(70)); // -1,03
console.log(getNormalDistribution(80)); // 0.28

