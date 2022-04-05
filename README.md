# Node.JS 스터디 with youtube clone

### 2021.11.27

- 프로젝트 환경설정 (`babel`, `nodemon`... )
- **app.listen(`port number`, `callback`)** 메서드를 사용하여 첫 서버 연결
- **app.get(`route`, `callback`)** 메서드를 사용하여 route handler 사용
- handler가 전달받는 request, response 인자에 대한 이해

### 2021.11.28

- 미들웨어의 개념 이해
- 미들웨어도 결국은 handler, handler는 request, response인자 외에 next 함수도 인자로 받아오는데, 원하는 접근이 아닐 경우 `return`을 통해 다음 handler로의 연결을 끊을 수도 있고, `next` 함수를 통해 다음 handler로 연결을 지속할 수도 있다.
- **app.get(`route`, `middleware` `callback`)**의 형식으로 사용, 미들웨어는 원하는 개수만큼 인자로 받을 수 있다. app.get(`route`, `middleware`, `middleware`, `middleware`... `callback`)
- **app.use(`middleware`...)** 메서드를 통해 미들웨어를 모든 route의 요청에 대해 전역으로 사용할 수 있다. (_이 경우 **app.use**는 페이지의 요청을 받는 모든 **app.get** 메서드의 위치보다 상단에 위치해야 한다._)

### 2021.11.29

- 컨트롤러 로직과 라우터 로직의 분리
- **app.use**를 사용하여 라우터 그룹화 적용
- 변수가 필요한 dynamic routing에서 변수를 handling 하는 방법
  route 작성시 `:변수명`을 사용하여 적용 이후 route에 적용된 변수의 값을 사용해야 할 경우는 `req.params`객체를 통해 접근

### 2021.11.30

- 현재 보고 있는 강의와는 다르게 탬플릿 사용이 아니라 react로 프론트를 진행예정
- express와 react의 연결에 대해 많은 방법을 고민했지만 결과적으로 현업에서 사용시에는 분리될 수 있도록 작성하는 것이 좋을 것 같아서 일단 프로젝트내 별도의 client폴더로 세팅
- 기존에 express로 라우팅을 진행했던 부분을 `react-router-dom`을 사용하여 프론트에서 라우팅을 진행예정 => 이를 위해서는 서버코드에서 별도의 설정이 필요함

### 2021.12.01

- 화면에 필요한 component들을 `atomic design`패턴의 방식으로 설계
- `react-router-dom`를 사용하여 front측에서 라우팅 진행 / 동시에 주소창의 url 직접 변경을 통해 이동시 반영을 위해 서버측 라우팅 작업 진행 (현재는 경로를 \*로 설정하여 모든 경로에 대하여 같은 파일(**client/build/index.html**)을 반환하도록 구현)
- `mongodb` / `mongoose` 설치 및 `mongoose.connect` 메서드를 활용하여 서버와 mongodb 연결
- `mongoose.Schema` 메서드를 활용하여 video model 생성
- `http-proxy-middleware`라이브러리 활용하여 frontend와 backend간의 데이터 통신 테스트 완료!

### 2021.12.02

- 서버의 실행과 설정을 분기하여 **init.js** 파일 생성
- videoController내의 db와 통신하는 함수를 `async` `await`을 통해 비동기 처리
- post 요청을 통해 front에서 입력 받은 video 데이터를 mongoose의 `create` 메서드를 통해 db내 저장
- db에 저장된 아이템을 home 화면에 표시, detail 페이지내에서 아이템의 id값을 통해 db에 저장되어 있는 아이템에 접근 후 해당 아이템의 정보 표시 (`findById`)

### 2021.12.03

- client 서버 실행시 계속해서 발생하는 오류 해결 => setupProxy.js파일 내 import 구문을 사용한 것이 이유, 왜 import구문을 사용하면 오류가 나는지는 현재 알아보는 중
- video edit 기능 구현
- 수정한 정보를 **post** 메서드로 서버에 전달, 서버에서 **req.body**를 통해 전달 받은 정보에 접근, 이후 해당 아이템의 id값을 통해 mongoose의 `findByIdAndUpdate`메서드를 사용하여 해당 아이템의 정보 업데이트
- video delete 기능 구현
- **delete** 메서드를 통해 삭제되는 아이템의 정보 전달, 서버에서 받은 아이템의 id값을 통해 역시 mongoose의 `findByIdAndDelete`실행 (mongoose에는 `findByIdAndDelete`와 `findByIdAndRemove`메서드가 존재한다. 두가지 모두 하는일은 비슷하나, 두 메서드가 mongodb에서 서로 다른 메서드를 호출한다.
  공식 문서에서는 특별한 이유가 아니면 `findByIdAndDelete`을 사용하도록 권장!)
- 검색 기능 구현
- react-router-dom v6에서의 `useSearchParams`훅을 사용하여 query string에 접근, 이후 query stirng을 서버로 전달하여 해당 string과 일치하는 아이템을 반환하도록 구현
- mongoose의 `find`메서드에서 **$regExp**를 사용하여 title 필드에 옵션을 주었다.

### 2021.12.23

- jsonwebtoken을 활용하여 유저의 로그인 로직 구현
- token과 refresh token을 cookie에 저장하여 서버와 통신
- recoil을 활용하여 유저의 로그인 상태를 전역으로 관리
- 어떠한 부분에서 서버와 통신을 해야 유저의 로그인 상태를 가장 매끄럽게 받아오고 전역으로 관리할 수 있는지 고민해보았다
- 결론은 front내 유틸 함수로 checkAuth라는 함수를 생성, 이후 privateRouter 파일을 따로 생성하여
  rootRouter내에서 인증이 필요한 Route들을 children으로 포함하였고, privateRouter내에서 checkAuth 함수를 호출하도록 설계하였다.
- checkAuth 함수내에서는 서버와의 불필요한 통신을 줄이기 위해 cookie에 저장되어 있는 token의 만료시기와 현재시기를 비교하여 만료시기가 지났을 경우 refreshToken의 만료시기와 비교한다.
  이후 refreshToken의 만료시기도 지났을 경우 서버와의 통신을 통해 해당 유저를 로그아웃 시키고 로그인 페이지를 띄워준다. (refreshToken의 만료시기가 지나지 않았을 경우 새로운 토큰을 생성하여 다시 cookie에 저장하여 준다.)
- 서버의 /auth api는 authMiddleware를 통해 해당 토큰의 정보와 일치하는 유저를 찾은 후 해당 토큰이 만료되었을 경우 새로운 token을 발급해준다.

### 2022.04.01

- front / back 코드 분리

## frontend

### 2022.04.05

- ncloud storage내 영상 url 적용
- 각 비디오 관련 스타일 수정 중
