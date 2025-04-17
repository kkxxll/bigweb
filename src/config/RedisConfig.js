import { createClient } from 'redis';

const options = {
  password: 'root',
  socket: {
    host: '172.16.183.128',
    port: 6379,
    detect_buffers: true,
    reconnectStrategy: function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 10) {
        return undefined;
      }
      return Math.min(options.attempt * 100, 3000);
    },
  },
};

// @ts-ignore
const client = createClient(options);

// 初始化连接并添加事件监听
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('end', () => console.log('Redis connection has closed'));
client.on('reconnecting', (o) =>
  console.log('Redis client reconnecting', o.attempt, o.delay)
);

// 连接Redis
const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
};

// 封装设置值的方法
const setValue = async (key, value, time) => {
  try {
    await connectRedis();
    if (typeof value === 'undefined' || value == null || value === '') {
      return;
    }
    if (typeof value === 'string') {
      if (typeof time !== 'undefined') {
        await client.set(key, value, 'EX', time);
      } else {
        await client.set(key, value);
      }
    } else if (typeof value === 'object') {
      // 存储为Hash
      await client.hSet(key, value);
    }
  } catch (err) {
    console.error('Redis setValue error:', err);
    throw err;
  }
};

// 封装获取值的方法
const getValue = async (key) => {
  try {
    await connectRedis();

    // 先尝试获取普通值
    try {
      const stringValue = await client.get(key);
      return stringValue;
    } catch (error) {
      // 如果不是普通值，尝试获取Hash
      const hashValue = await client.hGetAll(key);
      if (Object.keys(hashValue).length > 0) {
        return hashValue;
      }
    }
  } catch (err) {
    console.error('Redis getValue error:', err);
    throw err;
  }
};
const delValue = (key) => {
  client.del(key);
};

export { client, setValue, getValue, connectRedis, delValue };
