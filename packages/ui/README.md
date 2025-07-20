# @repo/ui

공용 UI 컴포넌트를 사용하기 위한 패키지입니다. <br/>


### 패키지 구조

```filetree
packages/ui/
├── package.json
└── src
    ├── assets
    │   ├── favicon.ico
    │   ├── og-image.png
    │   └── ...
    ├── components
    │   ├── header.tsx
    │   ├── footer.tsx
    │   └── ...
    ├── styles
    │   ├── styles.css
    │   └── theme.css
    └── ...
├── components.json
├── package.json
└── ...
```

- assets: 공용 아이콘, 이미지 등 정적 파일을 관리하는 디렉토리입니다.
- components: 공용 컴포넌트를 관리하는 디렉토리입니다.
- styles: 공용 스타일을 관리하는 디렉토리입니다.
- components.json: shadcn/ui 패키지를 사용하기 위한 설정 파일입니다.

<br/>

### 프로젝트 실행 방법

#### 1. 프로젝트 실행
```bash
turbo dev --filter=@repo/ui
```

#### 2. 빌드
```bash
turbo build --filter=@repo/ui
```

#### 3. 린트
```bash
turbo lint --filter=@repo/ui
```

#### 4. Shadcn 컴포넌트 추가
```bash
cd packages/ui
pnpm dlx shadcn add avatar
```

- 추가된 컴포넌트는 src/components 디렉토리에 추가됩니다.
- 자세한 설정은 [components.json](./components.json) 파일에서 확인할 수 있습니다.

<br/>


### TurboRepo 패키지 의존성

```json
// packages/ui/package.json
{
  "devDependencies": {
    "@repo/typescript-config": "workspace:*",
  },
  "dependencies": {
    "@repo/utils": "workspace:*"
  }
}
```


#### 1. [@repo/utils](/packages/utils/README.md)

공용 유틸리티 함수를 사용하기 위한 패키지입니다.  <br/>
현재 프로젝트에선 cn 함수만 사용되고 있습니다:

```tsx
import { cn } from "@repo/utils";
```

#### 2. [@repo/typescript-config](/packages/typescript-config/README.md)

타입스크립트 설정 파일을 사용하기 위한 패키지입니다.  <br/>
공용으로 정의된 설정을 extends(확장) 하여 사용하고 있습니다:

```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/typescript-config/react-library.json",
}
```

#### 3. [apps/blog](/apps/blog/README.md), [apps/portfolio](/apps/portfolio/README.md)

직접적으로 의존하고 있진 않지만, 각 애플리케이션에서 `@repo/ui` 패키지에서 내보낸 모듈을 사용하고 있습니다:
```json
// packages/ui/package.json
{
  "exports": {
    "./styles.css": "./dist/styles.css",
    "./theme.css": "./src/styles/theme.css",
    ".": "./src/components/index.ts",
    "./assets/*": "./src/assets/*"
  },
}
```


기본적으로 components 모듈을 내보냅니다.
애플리케이션에선 아래와 같이 사용할 수 있습니다:
```tsx
import { Button } from "@repo/ui";
```

assets 모듈은 아래와 같이 사용할 수 있습니다:
```tsx
import { favicon } from "@repo/ui/assets/favicon.ico";
```


styles 모듈은 아래와 같이 사용할 수 있습니다:
```css
@import "tailwindcss";
@import "@repo/ui/theme.css";
@import "@repo/ui/styles.css";
```



