import combineRoutes from 'koa-combine-routers';
import fs from 'fs';
import path from 'path';

// 定义模块路径
const modulesDir = path.resolve(__dirname, './modules');

// 读取目录中的文件
const files = fs.readdirSync(modulesDir).filter(file => file.endsWith('.js'));

// 动态加载模块
const modules = files.map(file => {
  const modulePath = path.join(modulesDir, file);
  const value = require(modulePath); // 动态加载模块
  return value.default || value; // 兼容默认导出和命名导出
});

export default combineRoutes(...modules);