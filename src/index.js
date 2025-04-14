import Koa from 'koa';
import koaBody from 'koa-body';
import compose from 'koa-compose';
import statics from 'koa-static';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import jsonutil from 'koa-json';
import path from 'path';
import compress from 'koa-compress';
import router from './routes/routes.js';

const app = new Koa();

const isDevMode = process.env.NODE_ENV === 'development';

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
]);

if (!isDevMode) {
  app.use(compress());
}

app.use(middleware);
app.use(router());
app.listen(3000);
