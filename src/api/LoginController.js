import { checkCode } from '../common/Utils';
import { SECRET } from '../config/const';
import send from '../config/MailConfig';
import jsonwebtoken from 'jsonwebtoken'


class LoginController {
  constructor() {}

  async forget(ctx) {
    const { body } = ctx.request;

    try {
      let result = await send({
        code: '1234',
        expire: '2019-10-01',
        email: body.email,
        user: 'Brian',
      });

      ctx.body = {
        code: 200,
        data: result,
        msg: '邮件发送成功',
      };
    } catch (error) {
      console.error(error);
    }
  }
  async login(ctx, next) {
    const { body } = ctx.request;

    const reuslt = await checkCode('code', body.code);
    if (!reuslt) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        data: null,
        msg: '验证码错误',
      };
      return
    }


    const token = jsonwebtoken.sign({ _id: body.username }, SECRET, {
      expiresIn: '30m'
    })

    ctx.body = {
      code: 200,
      data: {
        token
      },
      msg: '登录成功'
    }
  }
}

export default new LoginController();