import { Request, Response, Router } from "express";
import { authenticate, login } from "../middleware/authentication";
import { getActiveUser } from "../middleware/setIdentity";


const router: Router = Router();

router.post("/login", login, async (req: Request, res: Response) => {
  //Vad gör jag här? 
})

router.get('/logout', (_, res: Response) => {
  res.clearCookie('Session-Token');
  res.redirect('/')
})

router.get('/whoAmI', authenticate, async (req: Request, res: Response) => {
  return res.json({ isAuth: true, user: { userName: getActiveUser()[0].name + " " + getActiveUser()[0].surName, unit: getActiveUser()[0].unit } });
})

export = router;