import User from './test.js'

const imooc = new User({
  name: '123',
  age: 18,
  email: '123@.com',
});



imooc
  .save()
  .then(() => {
    console.log('保存成功');
  })
  .catch((err) => {
    console.log('保存失败', err);
  });

