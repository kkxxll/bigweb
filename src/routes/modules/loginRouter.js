import Router from 'koa-router';
import loginController from '../../api/LoginController';

const router = new Router();
router.prefix('/login')
router.post('/forget', loginController.forget);

router.post('/login', loginController.login);

export default router;
