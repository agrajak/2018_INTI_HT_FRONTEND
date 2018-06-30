## 2018_INTI_HT_FRONTEND
### 소개
2018 인하대학교 정보통신공학과 소모임 인트아이
해커톤 결과물 입니다.

VueJS를 이용해서 expressjs와 axios로 상호작용하는 프론트엔드 서비스를 만들었어요.

polyfill을 적용하지 않아서 구버전 익스플로러에서는 지원이 안될 수도 있어요.

사용한 것 : 
- Vuex(로그인 상태관리)
- axios(ajax)
- vue-router(페이지 전환)

꾸미는거에 사용한 것 : 
- Bootstrap
- NotyJS

### 설치법
```
git clone https://github.com/Azurepeal/2018_INTI_HT_FRONTEND.git
cd 2018_INTI_HT_FRONTEND
sudo npm install

```
```
cd config
vi config.json
```
다음 JSON파일 작성
```
{
	targetURL: 'localhost'
}
```
localhost가 꼭 아니어도 가능하지만 서버측에서 CORS 옵션을 키는걸 잊지마세요.

### 실행법
```
sudo npm run dev
```

### 빌드법
```
sudo npm run build
```
빌드 후 dist폴더 안에 생성되는 index.html 와 /static 폴더 내용물들을  백앤드에서 렌더링 해주면 잘 돌아가요.
