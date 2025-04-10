import Koa from 'koa';
import koaBody from 'koa-body';
import compose from 'koa-compose';
import statics from 'koa-static';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import jsonutil from 'koa-json';
import path from 'path';
import router from './routes/routes.js'


const app = new Koa();

/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  // monitorLogger,
  koaBody(),
  statics(path.join(__dirname, '../public')),
  cors(),
  jsonutil({ pretty: false, param: 'pretty' }),
  helmet(),
]);
app.use(middleware);
app.use(router())
app.listen(3000);
