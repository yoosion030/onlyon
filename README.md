# Only On

저의 이름(Sion)과 오직 하나뿐인(Only One) 의미를 담아 오직 하나뿐인 개인 브랜딩 서비스인 Only On입니다.

아래 링크에서 각 서비스를 확인할 수 있습니다.

| 서비스 | 링크 | 
| --- | --- |
| 기술 블로그 | https://blog.sionly.one |
| 포트폴리오 | https://portfolio.sionly.one |

<br/>

### 프로젝트 구조

| 애플리케이션 패키지 | 설명 | 문서 |
| --- | --- | --- |
| apps/blog | 기술 블로그를 구성하는 애플리케이션입니다. | [문서](apps/blog/README.md) |
| apps/portfolio | 포트폴리오를 구성하는 애플리케이션입니다. | [문서](apps/portfolio/README.md) |

<br/>

| 내부 패키지 | 설명 | 문서 |
| --- | --- | --- |
| @repo/ui | 공용 UI 에셋 및 컴포넌트를 제공하는 패키지입니다. | [문서](packages/ui/README.md) |
| @repo/utils | 공용 유틸리티 함수를 제공하는 패키지입니다. | [문서](packages/utils/README.md) |
| @repo/typescript-config | 타입스크립트 설정 파일을 공용으로 정의하기 위한 패키지입니다. | [문서](packages/typescript-config/README.md) |
| @repo/vitest-config | 테스트 환경을 공용으로 정의하기 위한 패키지입니다. | [문서](packages/vitest-config/README.md) |

<br/>

### 서비스 실행 방법


#### 1. 프로젝트 클론

```bash
git clone https://github.com/sionlyone/onlyon.git
cd onlyon
```

#### 2. 프로젝트 의존성 설치

```bash
pnpm install
pnpm add -g turbo
```

#### 3. 환경 세팅

- 각 프로젝트 .env.example을 참고하여 환경변수를 세팅합니다.
- Node 버전은 20.10.0 이상이어야 합니다.

#### 4. 프로젝트 실행

```bash
turbo dev
```

혹은 

```bash
pnpm dev
```

#### 5. 빌드 실행

```bash
turbo build
```

#### 6. 테스트 실행

```bash
turbo test
```

#### 7. 린트 실행

```bash
turbo lint
```

#### 8. 린트 자동 수정

```bash
turbo lint:fix
```

<br/>


### 기술 스택

- TurboRepo
- Next.js 15 + React 18 + TypeScript
- Tailwind CSS
- Vitest
- MDX
- Shadcn
- Docker, AWS ECS, AWS ALB, Cloudflare, S3
