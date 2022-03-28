import { Request, Response, Router, NextFunction } from "express";
import { createTempAttendent, getUnitMembers, getTempAttendents, getUnitLeaders } from "../logic/userLogic";
import { AttendentBase } from "../models/attendents";
import { authenticate } from '../middleware/authentication'


const router: Router = Router();

router.use(authenticate)

router.post("/createTempAttendent", async (req: Request, res: Response) => {
  return createTempAttendent(req.body as AttendentBase)
})

router.get("/getTempAttendents", async (_, res: Response) => {
  const tempAttendents: [] = await getTempAttendents();
  return res.json(tempAttendents)
})

router.get("/getUnitMembers", async (_, res: Response, next: NextFunction) => {
  const unitMembers: [] = await getUnitMembers();
  return res.json(unitMembers)
})

router.get("/getUnitLeaders", async (_, res: Response) => {
  const unitLeaders: [] = await getUnitLeaders()
  return res.json(unitLeaders)
})
export = router;