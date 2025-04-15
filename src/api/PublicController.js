import svgCaptcha from 'svg-captcha';
class PublicController {
  constructor() {}

  async getCaptcha(ctx) {
    const newCaptcha = svgCaptcha.create({
      size: 4,
      ignoreChars: '0o1li',
      noise: 3,
      color: true,
      width: 100,
      height: 40,
      fontSize: 50,
    });

    ctx.body = {
      code: 200,
      svg: newCaptcha.data,
    };
  }
}

export default new PublicController();
