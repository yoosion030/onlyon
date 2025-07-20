# Only On 블로그

Only On 서비스의 블로그 애플리케이션입니다.

### 프로젝트 실행 명령어

#### 1. 프로젝트 실행

```bash
turbo dev --filter=blog
```

#### 2. 프로젝트 빌드

```bash
turbo build --filter=blog
```

#### 3. 프로젝트 테스트

```bash
turbo test --filter=blog
```

테스트 커버리지 확인

```bash
turbo test:coverage --filter=blog
```

#### 4. 프로젝트 린트

```bash
turbo lint --filter=blog
```

린트 자동 수정

```bash
turbo lint:fix --filter=blog
```


#### 5. 의존성 설치

```bash
pnpm install --filter blog [패키지명]
```

<br/>


### 프로젝트 배포

#### 개발 환경
PR이 생성되면 자동으로 개발 환경에 배포됩니다. <br/>
개발 환경에선 robots, sitemap 등 검색 엔진 최적화 설정이 적용되어 있지 않습니다. <br/>
테스트하기 위한 환경이기 때문에 링크는 공개하지 않습니다. <br/>

개발 환경 배포 workflow: [.github/workflows/app-blog-dev.yml](/.github/workflows/app-blog-dev.yml)

#### 운영 환경


main에 푸시가 될 때 자동으로 운영환경에 배포됩니다. <br/>

- 운영 환경 배포 링크: https://blog.sionly.one
- 운영 환경 배포 workflow: [.github/workflows/app-blog-prod.yml](/.github/workflows/app-blog-prod.yml)

<br/>

### 프로젝트 구조

Next.js App Router 기반으로 아래와 같은 프로젝트 구조로 구성되어 있습니다:

```filetree
apps/blog/
├── src
│   ├── app
│   │   ├── (posts)
│   │   │   ├── 2023-03-24-git
│   │   │   │   └── page.mdx
│   │   ├── api
│   │   │   └── posts
│   │   │       └── route.ts
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── ...
│   ├── mdx-components.tsx
│   ├── libs
│   │   ├── generateMetadata.ts
│   │   └── ...
│   ├── components
│   │   ├── PostHeader.tsx
│   │   └── ...
│   ├── types
│   │   └── post.ts
│   ├── hooks
│   │   └── useGetRelationPosts.ts
│   ├── libs
│   │   ├── generateMetadata.ts
│   │   └── ...
├── .env
├── setup-test.tsx
└── vitest.config.ts
```

- api: 블로그 포스트 데이터를 관리하는 Next.js API 라우트 디렉토리입니다.
- mdx-components: MDX 컴포넌트 디렉토리입니다.
- components: 컴포넌트 디렉토리입니다.
- types: 타입 디렉토리입니다.
- libs: 클라이언트 단에서 서버 데이터(metadata, 포스트 데이터)를 관리하는 라이브러리 디렉토리입니다.


프로젝트 내에서 절대경로로 접근하도록 `tsconfig.json` 파일에 아래와 같이 설정되어 있습니다:

```json
{
  "compilerOptions": {
    "paths": {
      "@blog/types": ["./src/types/index.ts"],
      "@blog/types/*": ["./src/types/*"],
      "@blog/libs": ["./src/libs/index.ts"],
      "@blog/libs/*": ["./src/libs/*"],
      "@blog/components": ["./src/components/index.ts"],
      "@blog/components/*": ["./src/components/*"],
      "@blog/hooks": ["./src/hooks/index.ts"],
      "@blog/hooks/*": ["./src/hooks/*"]
    }
  }
}
```

<br/>

### 블로그 작성 방법

1. app 디렉토리 하위의 (posts) 디렉토리에 접근합니다.
2. 해당 디렉토리 하위에 새로운 폴더를 생성하여 `현재 날짜-포스트제목` 형식으로 폴더명을 설정합니다.
3. 해당 폴더 내부에 `page.mdx` 파일을 생성합니다.
4. page.mdx 파일 내부에 포스트 내용을 작성합니다.
- 이때 포스트의 정보는 post 변수에 정의하고 export 합니다.
- 포스트 내용대로 메타데이터를 정의하기 위해 동적으로 생성한 메타데이터를 export 합니다.
- 포스팅 상단에 포스트 정보를 표시하기 위해 `<PostHeader>` 컴포넌트에 post 변수를 props로 전달합니다.
- 포스팅 하단에 관련 포스트 목록을 표시하기 위해 `<RelationPostList>` 컴포넌트에 post 변수를 props로 전달합니다.

```tsx
import { generateMetadata } from "@blog/libs";

export const post = {
  title: "신입 개발자의 포트폴리오 작성법",
  description:
    "60개 회사에 지원해서 8개의 회사(오후두시랩, 신한은행, 토스뱅크, 미리디, 데이원컴퍼니, 베이글코드, 클래스팅, 팀스파르타)에 서류 합격한 방법",
  publishDate: new Date("2023-12-21"),
  posterImage:
    "https://onlyon.s3.ap-southeast-2.amazonaws.com/...",
  categories: ["신입 개발자의 취업 회고"],
  recommended: true,
};

export const metadata = generateMetadata({ post });

<PostHeader post={post} />

포스팅 내용

<RelationPostList post={post} />
```

#### 포스트 정보

기본적으로 포스트의 기본 정보는 다음과 같이 정의합니다:

```tsx
export const post = {
  title: "신입 개발자의 포트폴리오 작성법",
  description:
    "60개 회사에 지원해서 8개의 회사(오후두시랩, 신한은행, 토스뱅크, 미리디, 데이원컴퍼니, 베이글코드, 클래스팅, 팀스파르타)에 서류 합격한 방법",
  publishDate: new Date("2023-12-21"),
  posterImage:
    "https://onlyon.s3.ap-southeast-2.amazonaws.com/...",
  categories: ["신입 개발자의 취업 회고"],
  recommended: true,
};
```

- title: 포스트 제목
- description: 포스트 설명
- publishDate: 포스트 작성일
- posterImage: 포스트 이미지
  - 포스터 이미지가 없는 경우 제목 텍스트를 기반한 기본 이미지를 생성하여 노출됩니다.
- categories: 포스트 카테고리
- recommended: 포스트 추천 여부
  - 추천 포스트여도 목록에는 최신 날짜 기준으로 총 5개만 노출됩니다.

<br/>

### TurboRepo 패키지 의존성

```json
// apps/blog/package.json
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/utils": "workspace:*",
  },
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
    "@repo/vitest-config": "workspace:*"
  }
}
```

#### 1. [@repo/ui](/packages/ui/README.md)

공용 UI 컴포넌트를 사용하기 위한 패키지입니다. <br/>
Header, Footer 등 공용 컴포넌트를 사용하기 위해 아래와 같이 임포트합니다:

```tsx
import { Footer, Header } from "@repo/ui";
```

또한, 기본 css 파일을 `global.css`에 정의하여 사용하고 있습니다:

```css
/* apps/blog/src/app/global.css */
@import "tailwindcss";
@import "@repo/ui/theme.css";
@import "@repo/ui/styles.css";
```

#### 2. [@repo/utils](/packages/utils/README.md)

공용 유틸리티 함수를 사용하기 위한 패키지입니다.  <br/>
현재 프로젝트에선 cn 함수만 사용되고 있습니다:

```tsx
import { cn } from "@repo/utils";
```

#### 3. [@repo/typescript-config](/packages/typescript-config/README.md)

타입스크립트 설정 파일을 사용하기 위한 패키지입니다.  <br/>
공용으로 정의된 설정을 extends(확장) 하여 사용하고 있습니다:

```json
// apps/blog/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  }
}
```

#### 4. [@repo/vitest-config](/packages/vitest-config/README.md)

테스트 환경을 공용으로 정의하기 위한 패키지입니다.  <br/>
Vitest의 `mergeConfig`를 통해 설정을 확장하여 사용하고 있습니다:

```tsx
import { uiConfig } from "@repo/vitest-config/ui";

export default mergeConfig(uiConfig, {
  resolve: {
    alias: {
      "@blog/components": resolve(__dirname, "./src/components"),
      "@blog/types": resolve(__dirname, "./src/types"),
      "@blog/utils": resolve(__dirname, "./src/utils"),
      "@blog/hooks": resolve(__dirname, "./src/hooks"),
      "@blog/libs": resolve(__dirname, "./src/libs"),
      "@repo/ui": resolve(
        __dirname,
        "../../packages/ui/src/components/index.ts",
      ),
      "@repo/utils": resolve(__dirname, "../../packages/utils/index.ts"),
    },
  },

  test: {
    setupFiles: ["./setup-test.tsx"],
  },
})
```

`setup-test.tsx` 파일은 공용으로 사용하지 않고, 프로젝트 루트에 정의하여 사용하고 있습니다:

```tsx
// apps/blog/setup-test.tsx
import "@testing-library/jest-dom";

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => (
    <img data-testid="next-image" src={src} alt={alt} {...props} />
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});
```
