import { Request, Response, Router } from "express";
import { Meeting, MeetingBase } from '../models/meeting'
import { updateMeeting, getActiveMeetings, saveMeetingAttendents, getAllUnits, createNewMeeting, getReportedMeetings, getUnreportedMeetings, getMeetingAttendents } from '../logic/meetingLogic'
import { authenticate } from '../middleware/authentication'

const router: Router = Router();

router.use(authenticate)

router.get("/getActiveMeetings", async (_, res: Response) => {
  return res.json(await getActiveMeetings());
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
  return res.json(await getAllUnits())
})

router.get("/getReportedMeetings", async (_, res: Response) => {
  return res.json(await getReportedMeetings())
})

router.get("/getUnreportedMeetings", async (_, res: Response) => {
  return res.json(await getUnreportedMeetings());
})

router.post("/getMeetingAttendents", async (req: Request, res: Response) => {
return res.json(await getMeetingAttendents(req.body.id));
})

export = router;