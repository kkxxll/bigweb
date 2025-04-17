import { delValue, getValue, setValue } from './RedisConfig.js';

// setValue("kk1231", {name: 1});
getValue('kk123')
  .then((res) => {
    console.log('get', res);
  })
  .catch((err) => {
    console.log('err', err);
  });
getValue('kk1231')
  .then((res) => {
    console.log('get', res);
  })
  .catch((err) => {
    console.log('err', err);
  });

delValue('kk123');
delValue('kk1231');
