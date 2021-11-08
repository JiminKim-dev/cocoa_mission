# debugging 기술문서 정리하기

## breakpoints란?
breakpoints는 코드 실행을 일시 중지하는 지점이며 디버깅시 해당 지점의 스코프, 콜스텍 등 실행 정보를 검사할 수 있다.
- 설정 방법: 해당 코드의 줄 번호를 클릭하거나 코드 안에 debugger 명령어를 적어준다.

## watch 사용법
Add Expression 버튼 `+`   
원하는 표현식을 입력하면 특정 변수나 객체의 값이 변하는 것을 볼 수 있다.

## call stack 의 의미

## Step over / Step into / Step out
- step over:
breakpoint의 그 다음 라인이 함수이면 함수를 실행하더라도 함수 내부로 들어가지는 않는다. 

- step into:
breakpoint의 그 다음 라인이 함수이면 함수 내부로 들어가서 한 줄씩 실행한다.

- step out:
함수를 계속 실행하다가 함수가 끝나면 실행을 멈춘다.

<https://ko.javascript.info/debugging-chrome>