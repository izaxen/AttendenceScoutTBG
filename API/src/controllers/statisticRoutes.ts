import { Response, Router } from "express";
import { authenticate } from "../middleware/authentication";
import {statisticLogic} from "../logic/statisticLogic"

const router: Router = Router();

router.use(authenticate);

router.get('/getStatisticReport', async (_, res: Response) => {
  const report = await statisticLogic.getStatisticReport();
  res.json(report);
})

router.get('/getStatisticPresens', async (_, res: Response) => {
  const report = await statisticLogic.getStatisticPresens();
  res.json(report)
})


export = router