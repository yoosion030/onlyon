# Only On 포트폴리오

Only On 서비스의 포트폴리오 애플리케이션입니다.


### 프로젝트 실행 명령어

#### 1. 프로젝트 실행

```bash
turbo dev --filter=portfolio
```

#### 2. 프로젝트 빌드

```bash
turbo build --filter=portfolio
```

#### 3. 프로젝트 테스트

```bash
turbo test --filter=portfolio
```

테스트 커버리지 확인

```bash
turbo test:coverage --filter=portfolio
```

#### 4. 프로젝트 린트

```bash
turbo lint --filter=portfolio
```

린트 자동 수정

```bash
turbo lint:fix --filter=portfolio
```


#### 5. 의존성 설치

```bash
pnpm install --filter portfolio [패키지명]
```

<br/>


### 프로젝트 배포

#### 개발 환경
포트폴리오 애플리케이션은 개발 배포 환경이 따로 구축되어 있지 않습니다. <br/>
그래서 PR이 생성되면 lint, unit-testing만 진행하게 됩니다. <br/>

개발 환경 배포 workflow: [.github/workflows/app-portfolio-dev.yml](/.github/workflows/app-portfolio-dev.yml)

#### 운영 환경


main에 푸시가 될 때 자동으로 운영환경에 배포됩니다. <br/>

- 운영 환경 배포 링크: https://portfolio.sionly.one
- 운영 환경 배포 workflow: [.github/workflows/app-portfolio-prod.yml](/.github/workflows/app-portfolio-prod.yml)

<br/>


### TurboRepo 패키지 의존성

```json
// apps/portfolio/package.json
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
/* apps/portfolio/src/app/global.css */
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
// apps/portfolio/tsconfig.json
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
      "@portfolio/components": resolve(__dirname, "./src/components"),
      "@portfolio/types": resolve(__dirname, "./src/types"),
      "@portfolio/utils": resolve(__dirname, "./src/utils"),
      "@portfolio/hooks": resolve(__dirname, "./src/hooks"),
      "@portfolio/libs": resolve(__dirname, "./src/libs"),
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
// apps/portfolio/setup-test.tsx
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



