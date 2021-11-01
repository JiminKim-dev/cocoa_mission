## 학습 체크 포인트

- Node.js를 통해서 JavaScript개발을 할 수 있다. 🙆‍♀️
- 함수의 역할은 한가지에 집중하고 있다. 🙅‍♀️
- 일관된 변수명과 함수이름을 짓고 있다. 🙅‍♀️
- 함수는 늘 동일한 입력값에 동일한 출력을 보장한다. 🤔
- 개발과정에서 breakpoint나 'debugger;' 키워드를 사용해서 디버깅을 했다. 🙅‍♀️

### 내가 구현한 getArea 함수의 오류

1. 함수의 역할이 복잡하다 → 한 case 안에 if문, 배열, for문 등등이 들어있다.
2. 일관된 변수명이 아니다 → 매개변수 이름의 오류 (shape, **width,** length, height)
    - 원의 넓이를 구하기 위해선 **반지름**이 필요함 case 'circle' 에서 width는 적합하지 않음
+ 모든 case가 매개변수 width, length, height를  다 사용하는 것은 아니다. 이게 과연 올바른 함수일까?

**결론**: getArea안에 도형 함수(getCircle, getRectangle, getTrapezoid)를 분리해서 넣어야 한다.