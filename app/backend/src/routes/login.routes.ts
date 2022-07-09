import * as express from 'express';
import { userFactory } from '../factories';
import { Validation } from '../middlewares';

const validation = new Validation();
const controller = userFactory();
const router = express.Router();

router.post('/', validation.login, (req, res, next) => {
  controller.login(req, res, next);
});

export default router;
