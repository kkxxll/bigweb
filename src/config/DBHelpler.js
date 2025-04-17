import mongoose from 'mongoose';

// import config from './index'

// 创建连接=
mongoose.connect('mongodb://test:test@172.16.183.128:27017/testdb', {});

// 连接成功
mongoose.connection.on('connected', () => {
  console.log(`MongoDB: connection opened! `);
});

// 连接异常
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
});

// 断开连接
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});

export default mongoose;
