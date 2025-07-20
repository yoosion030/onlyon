# @repo/typescript-config

타입스크립트 설정 파일을 공용으로 정의하기 위한 패키지입니다. <br/>


### 패키지 구조
```filetree
packages/typescript-config/
├── base.json
├── nextjs.json
├── package.json
└── react-library.json
```

<br/>

### 1. base.json
기본 `tsconfig.json` 파일입니다.

다른 `tsconfig.json` 파일들은 기본적으로 해당 파일을 확장하여 규칙을 정의해야합니다:
```json
// packages/typescript-config/nextjs.json
{
  "extends": "./base.json",
}
```


### 2. nextjs.json
Next.js 프로젝트를 위한 `tsconfig.json` 파일입니다.

Next.js 프로젝트에서 아래와 같이 해당 파일을 확장하여 사용합니다:
```json
// apps/blog/tsconfig.json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ],
  },
}
```

Next.js 프로젝트에서 vitest 테스트를 위해 `vitest/globals`를 참조하고 있습니다.
```json
// packages/typescript-config/nextjs.json
{
  "compilerOptions": {
    "types": ["@testing-library/jest-dom", "vitest/globals"]
  }
}
```



### 3. react-library.json
프로젝트가 아닌 라이브러리 패키지를 위한 `tsconfig.json` 파일입니다.

대표적으로 ui 패키지에서 아래와 같이 해당 파일을 확장하여 사용합니다:
```json
// packages/ui/tsconfig.json
{
  "extends": "@repo/typescript-config/react-library.json",
}
```


