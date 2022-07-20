import * as express from 'express';
import { MatchesFactory } from '../factories';
import { Validation } from '../middlewares';

const validation = new Validation();
const controller = MatchesFactory();
const router = express.Router();

router.get('/', validation.matchQuery, (req, res, next) => {
  controller.getAll(req, res, next);
});

router.post('/', validation.token, (req, res, next) => {
  controller.create(req, res, next);
});

router.put('/:id/finish', (req, res, next) => {
  controller.finishMatch(req, res, next);
});

router.put('/:id', (req, res, next) => {
  controller.updateGoals(req, res, next);
});

export default router;
