class DemoController {
  constructor() {}

  async demo(ctx) {
    ctx.body = {
      msg: 'demo hello111',
    };
  }
}

export default new DemoController();
