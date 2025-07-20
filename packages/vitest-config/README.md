# @repo/vitest-config

테스트 환경을 공용으로 정의하기 위한 패키지입니다. <br/>


### 패키지 구조

```filetree
packages/vitest-config/
├── configs/
│   ├── base-config.ts
│   ├── ui-config.ts
│   └── ...
├── scripts/
├── package.json
└── ...
```

<br/>

### 프로젝트 실행 방법

#### 1. 빌드

```bash
turbo build --filter=@repo/vitest-config
```


### 2. 커버리지 JSON 파일 수집

각 패키지의 coverage 파일을 `vitest-config/raw` 폴더에 수집합니다.

```bash
turbo collect-json-reports
```

### 3. 커버리지 JSON 파일 병합
수집된 개별 커버리지 파일을 `vitest-config/merged` 폴더에 하나로 병합합니다.

```bash
turbo merge-json-reports
```

### 4. 커버리지 리포트 생성

병합된 커버리지 파일을 기반으로 커버리지 리포트를 생성합니다.

```bash
turbo report
```

### 5. 커버리지 리포트 확인

```bash
turbo view-report
```


<br/>

### 1. configs/base-config.ts

기본 테스트 환경을 정의하는 파일입니다.

```tsx
import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      enabled: true,
    },
  },
});
```

- `provider: "istanbul"`: 코드 커버리지 측정에 Istanbul을 사용합니다.
- `enabled: true`: 코드 커버리지 측정을 활성화합니다.


<br/>

### 2. configs/ui-config.ts

UI 테스트 환경을 정의하는 파일입니다.

```tsx
import react from "@vitejs/plugin-react";
import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    plugins: [react()],

    test: {
      environment: "jsdom",
      pool: "threads",
      globals: true,
    },
  }),
);
```

- `react()`: React 컴포넌트를 테스트할 수 있도록 JSX 변환과 Hot Module Replacement를 제공합니다.
- `environment: "jsdom"`: 브라우저 환경을 시뮬레이션하는 jsdom을 사용합니다. DOM API와 브라우저 globals를 제공합니다.
- `pool: "threads"`: 테스트를 별도 워커 스레드에서 병렬로 실행합니다.
- `globals: true`: describe, it, test, expect 등의 전역 함수를 자동으로 가져옵니다.


<br/>


### TurboRepo 패키지 의존성


```json
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
  }
```

#### 1. [@repo/typescript-config](/packages/typescript-config/README.md)

타입스크립트 설정 파일을 사용하기 위한 패키지입니다.  <br/>
공용으로 정의된 설정을 extends(확장) 하여 사용하고 있습니다:

```json
// packages/vitest-config/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
}
```


#### 2. [apps/blog](/apps/blog/README.md), [apps/portfolio](/apps/portfolio/README.md)


직접적으로 의존하고 있진 않지만, 각 애플리케이션에서 `@repo/vitest-config` 패키지에서 내보낸 모듈을 사용하고 있습니다:

```json
"exports": {
  "./base": "./dist/configs/base-config.js",
  "./ui": "./dist/configs/ui-config.js"
},
```

base와 ui config 모듈을 내보냅니다.
애플리케이션에선 아래와 같이 사용할 수 있습니다:

```ts
import { resolve } from "node:path";
import { uiConfig } from "@repo/vitest-config/ui";
import { mergeConfig } from "vitest/config";

export default mergeConfig(uiConfig, {
  resolve: {
    ...
  },

  test: {
    ...
  },
});
```
