import * as express from 'express';
import { MatchesFactory } from '../factories';
import { Validation } from '../middlewares';

const validation = new Validation();
const controller = MatchesFactory();
const router = express.Router();

router.get('/', (req, res, next) => {
  controller.getAll(req, res, next);
});

router.get('/validate', validation.token);

export default router;
