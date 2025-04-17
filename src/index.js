import Koa from 'koa';
import koaBody from 'koa-body';
import compose from 'koa-compose';
import statics from 'koa-static';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import jsonutil from 'koa-json';
import JWT from 'koa-jwt';
import path from 'path';
import compress from 'koa-compress';
import router from './routes/routes.js';
import errorHandler from './common/ErrorHandle.js';
import { SECRET } from './config/const.js';

const app = new Koa();

const isDevMode = process.env.NODE_ENV === 'development';

// 定义公共路径，不需要jwt鉴权
const jwt = JWT({ secret: SECRET }).unless({
  path: [/^\/public/, /^\/login/],
});

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  // monitorLogger,
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(), // 跨域
  jsonutil({ pretty: false, param: 'pretty' }), // json格式化
  helmet(), // http 安全
  errorHandler, // 错误处理
  jwt,
]);

if (!isDevMode) {
  app.use(compress());
}

app.use(middleware);
app.use(router());
app.listen(3000);
