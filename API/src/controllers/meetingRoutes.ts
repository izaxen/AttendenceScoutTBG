import { Request, Response, Router } from "express";
import { Meeting, MeetingBase } from '../models/meeting'
import { updateMeeting, getActiveMeetings, saveMeetingAttendents, getAllUnits, createNewMeeting } from '../logic/meetingLogic'
import { authenticate } from '../middleware/authentication'

const router: Router = Router();

router.use(authenticate)

router.get("/getActiveMeetings", async (_, res: Response) => {
  const meetings: [] = await getActiveMeetings();
  return res.json(meetings);
})

router.post("/saveMeetingAttendents", async (req: Request, res: Response) => {
  return saveMeetingAttendents(req.body)
})

router.post("/updateMeeting", async (req: Request, res: Response) => {
  return updateMeeting(req.body as Meeting)
})

router.post("/createNewMeeting", async (req: Request, res: Response) => {
  return createNewMeeting(req.body as MeetingBase)
})

router.get("/getAllUnits", async (_, res: Response) => {
  const units:[] = await getAllUnits();
  return res.json(units)
})

export = router;