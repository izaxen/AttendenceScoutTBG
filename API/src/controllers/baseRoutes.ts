import { Request, Response, Router } from "express";
import { authenticate, login } from "../middleware/authentication";
import jwt_decode, { JwtDecodeOptions } from 'jwt-decode'
import { getActiveUser, setActiveUser } from "../middleware/setIdentity";
import { validateLeader } from "../logic/userLogic";


const router: Router = Router();

router.post("/login", login, async (req: Request, res: Response) => {
//Vad gör jag här? 
})

router.get('/logout', (_, res:Response) => {
  res.clearCookie('Session-Token');
  res.redirect('/')
})

router.get('/whoAmI', authenticate, async (req: Request, res: Response) => {
  let token: JwtDecodeOptions = jwt_decode(req.cookies['Session-Token']);
  if (!getActiveUser()) {
    await validateLeader(token['given_name'], token['family_name'])
  }
  return res.json({ isAuth: true, user: { userName: token['name'], unit: getActiveUser()[0].unit } });
})

export = router;