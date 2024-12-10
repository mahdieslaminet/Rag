## Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Setup

This application will run on debian based linux systems. You can dockerize this project and use one of debian based linux images.

```bash
./install.sh
```

## Running

Place trimmed and cleaned pdf as "document.pdf" into document.pdf. </br>
Then you have to call scripts sequential. </br>

```bash
npx ts-node pdf-to-image.ts
npx ts-node crop-images.ts
npx ts-node image-to-texts.ts
npx ts-node texts-normalizing.ts
```
