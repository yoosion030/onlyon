# @repo/utils

공용 유틸리티 함수를 사용하기 위한 패키지입니다. <br/>


### 패키지 구조

```filetree
packages/utils/
├── package.json
├── cn.ts
├── index.ts
└── ...
```

<br/>

### 1. cn 함수

`tailwind-merge`를 사용하여 클래스를 병합하는 유틸리티 함수입니다.

```tsx
import { cn } from "@repo/utils";

cn("bg-red-500", "text-white");
```

<br/>

### TurboRepo 패키지 의존성

```json
// packages/utils/package.json
{
  "devDependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```

#### 1. [@repo/typescript-config](/packages/typescript-config/README.md)

타입스크립트 설정 파일을 사용하기 위한 패키지입니다.  <br/>
공용으로 정의된 설정을 extends(확장) 하여 사용하고 있습니다:

```json
// packages/utils/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
}
```

#### 2. [apps/blog](/apps/blog/README.md), [apps/portfolio](/apps/portfolio/README.md)

직접적으로 의존하고 있진 않지만, 각 애플리케이션에서 `@repo/utils` 패키지에서 내보낸 모듈을 사용하고 있습니다:

```json
// packages/utils/package.json
{
  "exports": {
    ".": {
      "types": "./index.ts",
      "import": "./index.ts",
      "default": "./index.ts"
    }
  },
}

```

기본적으로 `index.ts` 파일을 내보냅니다.
애플리케이션에서 아래와 같이 사용할 수 있습니다:

```tsx
import { cn } from "@repo/utils";
```
