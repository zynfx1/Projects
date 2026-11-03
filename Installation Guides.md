
---

### Frontend Installation Guides
##### • VUE Frameworks Installations:
```bash
> npm create vue@latest
> npm create vite@latest
> npm i pinia-plugin-persistedstate


npm install @lottiefiles/dotlottie-vue 

``` 


##### • Typescript/Eslint Installations:
```bash
> npm install typescript --save-dev

Notes:
> to complie typescript, need "build": "tsc" in package.json
npm run build

To install eslint for typescript:
npm install typescript-eslint --save-dev

``` 


##### • Tailwind CSS Installations:
#### Install Tailwind CSS
- Install `tailwindcss` and `@tailwindcss/vite` via npm.
```bash
> npm install -D prettier-plugin-tailwindcss
> npm install tailwindcss @tailwindcss/vite
``` 

#### Configure the Vite plugin
-  Add the `@tailwindcss/vite` plugin to your Vite configuration.
```js
import { defineConfig } from 'vite'
>>import tailwindcss from '@tailwindcss/vite'<<

export default defineConfig({
  plugins: [
  >>tailwindcss(),<<
  ],
})
```

#### Import Tailwind CSS
- Add an `@import` to your CSS file that imports Tailwind CSS.
```css
> @import "tailwindcss";
``` 


### Backend Installation Guides:
##### •  Server Express Environment Installations:
```bash
to generate long random string for JWT_SECRET
> node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

> npm i nodemailer
> npm i -D @types/nodemailer

> npm install express-rate-limit

> npm install disposable-email-domains

For validation if the user inputed valid gmail address '@' 
> npm i validator
> npm i -D @types/validator

> npm install csrf-csrf (csrf protection)
> npm install dotenv
> npm init -y
> npm install express
> npm install cors
> npm install -D @types/express
> npm install -D @types/cors
> npm install -D nodemon typescript ts-node @types/node 

new --
npm install express pg bcrypt jsonwebtoken cookie-parser cors dotenv
npm install --save-dev @types/pg @types/bcrypt @types/jsonwebtoken @types/cookie-parser @types/express @types/cors
``` 
### Database Installation Guides:
##### •  Postgre Sql Installations:
```bash
-- postgresql://USER:PASSWORD@HOST:PORT/DATABASE
``` 


