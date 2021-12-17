# app_web

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# 打包说明
- web移动端打包
  src\api\login.js  src\api\scheme.js 文件中代理地址为通用地址
  src\pages\login.vue 文件中获取 cookie 方法开启（记住登录账户）
  src\router\index.js 文件中更改路由模式为history
  config\index.js 文件中更改 build assetsPublicPath 项配置，项目输出地址为 /app/

- app打包
  src\api\login.js  src\api\scheme.js 文件中代理地址为物理 ip 地址（服务器地址）
  src\pages\login.vue 文件中获取 cookie 方法关闭，app 使用 cookie.js 会产生bug
  src\router\index.js 文件中路由模式为hash
  config\index.js 文件中更改 build assetsPublicPath 项配置，项目输出地址为 ./