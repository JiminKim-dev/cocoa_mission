import zTable from "./data/zTable.mjs";

class gradeManager {
  constructor(data) {
    this.data = data;
  }

  // 평균 구하기
  getMean() {
    return this.data.reduce((pre, cur) => pre + cur) / this.data.length;
  }

  // 편차: 변량 - 평균, 편차 제곱: Math.pow
  getDeviationPow () {
    return this.data.map(e => Math.pow(e - this.getMean(), 2));
  }

  // 분산: 편차 제곱 평균 
  getVariance() {
    return this.getDeviationPow().reduce((pre, cur) => pre + cur) / this.data.length; 
  }

  // 표준편차: 분산의 제곱근 (Math.sqrt)
  getStandardDeviation() {
    return Math.sqrt(this.getVariance());
  }

  // 표준화
  getNormalDistribution(z) {
    return ((z - this.getMean()) / this.getStandardDeviation()).toFixed(2);
  }
  
  // z인덱스 구하기
  getZIndex(x) {
    const normalDistribution = Math.abs(this.getNormalDistribution(x)).toFixed(2);

    const col = +normalDistribution.substring(0, 3);
    const row = +normalDistribution.substring(3);

    return zTable[col][row]
  }
  
  // 확률 구하기
  getProbability(min, max) {
    let probability = '';
    const normalDistributionMin = this.getNormalDistribution(min);
    const normalDistributionMax = this.getNormalDistribution(max);
    const zIndexMin = this.getZIndex(min);
    const zIndexMax = this.getZIndex(max);

    if (normalDistributionMin < 0 && normalDistributionMax < 0) {
      // 표준화된 값이 둘 다 음수일때
      probability = (1 - zIndexMax) - (1 - zIndexMin); 
    } else if (normalDistributionMin < 0) {
      // 표준화된 값 중 작은 값?이 음수일때
      probability = zIndexMax - (1 - zIndexMin); 
    } else {
      probability = zIndexMax - zIndexMin;
    }

    const percent = (probability * 100).toFixed(2);

    return `${percent}%`;
    }
}

const data = [
  89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77,
  84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01
]

const grade = new gradeManager(data);
const test = `
  # 전체 평균은 ${grade.getMean()} 입니다.
  # 표준편차는 ${grade.getStandardDeviation()} 입니다.

  --------------test 1---------------

  # 70을 표준화 하면 ${grade.getNormalDistribution(70)} 입니다.
  # 80을 표준화 하면 ${grade.getNormalDistribution(80)} 입니다.

  # 70의 z-index 값은 ${grade.getZIndex(70)} 입니다.
  # 80의 z-index 값은 ${grade.getZIndex(80)} 입니다.

  # 70점과 80점 사이의 값을 갖는 확률: ${grade.getProbability(70, 80)}

  --------------test 2---------------

  # 65를 표준화 하면 ${grade.getNormalDistribution(65)} 입니다.
  # 70을 표준화 하면 ${grade.getNormalDistribution(70)} 입니다.

  # 65의 z-index 값은 ${grade.getZIndex(65)} 입니다.
  # 70의 z-index 값은 ${grade.getZIndex(70)} 입니다.

  # 65점과 70점 사이의 값을 갖는 확률: ${grade.getProbability(65, 70)}

  --------------test 3---------------  

  # 60을 표준화 하면 ${grade.getNormalDistribution(60)} 입니다.
  # 90을 표준화 하면 ${grade.getNormalDistribution(90)} 입니다.

  # 60의 z-index 값은 ${grade.getZIndex(60)} 입니다.
  # 90의 z-index 값은 ${grade.getZIndex(90)} 입니다.

  # 60점과 90점 사이의 값을 갖는 확률: ${grade.getProbability(60, 90)}

  --------------test 3---------------

  # 80을 표준화 하면 ${grade.getNormalDistribution(80)} 입니다.
  # 90을 표준화 하면 ${grade.getNormalDistribution(90)} 입니다.

  # 80의 z-index 값은 ${grade.getZIndex(80)} 입니다.
  # 90의 z-index 값은 ${grade.getZIndex(90)} 입니다.

  # 80점과 90점 사이의 값을 갖는 확률: ${grade.getProbability(80, 90)}
`;
console.log(test);