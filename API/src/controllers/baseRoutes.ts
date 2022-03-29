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
  console.log("whoami", getActiveUser());
  
  return res.json({ isAuth: true, user: { userName: getActiveUser().name + " " + getActiveUser().surName, unit: getActiveUser().unit } });
})

export = router;