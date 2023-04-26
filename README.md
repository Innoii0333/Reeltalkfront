# ! important !  Original framework
https://github.com/socketbear/vue-dev-guide
## description

- Reeltalks Frontend 개발 페이지

- API 테스트용 브랜치. 로그인 관련 권한이 없으므로 로그인 관련 권한은 
    통합 테스트를 위한 브랜치를 마련할테니 따로 테스트해 주세요.
    로그인 자체의 기능을 막지는 않았지만, 그다지 유효하지 않습니다.
- userid와 name을 참조하는 곳에서는 자동으로 userid1, userid1 을 이용하고 있습니다.
    혹시 존재하지 않는 유저 정보로 인해 join에서 오류가 뜨는 경우
    본인 사용의 회원가입 정보에 따라 pinia에서 본인의 user_id와 user_name을 직접 입력해 테스트 가능합니다
    (script setup 안에서 반응형 변수는 ref로 선언됩니다. src/store/session.ts '' 안에 db에 등록된 정보를 입력하고 사용하면 됩니다) 
    !!!!! 추후 버전에서는 로그인 기능과 라우터 내비게이션 가드가 포함됩니다.
- 연동에 이상이 있을 경우 언제든 연락 바랍니다.
### Development

Just run and visit http://localhost:3333

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

### Docker Production Build

First, build the vitesse image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t vitesse:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 vitesse:latest
```
