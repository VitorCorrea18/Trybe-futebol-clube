import * as express from 'express';
import { leaderBoardFactory } from '../factories';
// import { Validation } from '../middlewares';

// const validation = new Validation();
const controller = leaderBoardFactory();
const router = express.Router();

router.get('/home', (req, res, next) => {
  controller.getLeaderBoardHome(req, res, next);
});

export default router;
