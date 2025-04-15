import send from '../config/MailConfig';

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
}

export default new LoginController();