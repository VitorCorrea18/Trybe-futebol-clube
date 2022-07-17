import * as express from 'express';
import { teamFactory } from '../factories';
import { Validation } from '../middlewares';

const validation = new Validation();
const controller = teamFactory();
const router = express.Router();

router.get('/:id', validation.teamId, (req, res, next) => {
  controller.getById(req, res, next);
});

router.get('/', (req, res, next) => {
  controller.getAll(req, res, next);
});

export default router;
