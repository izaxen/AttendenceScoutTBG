import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from 'google-auth-library';
import { validateLeader } from "../logic/userLogic";
import { getActiveUser } from "./setIdentity";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies['Session-Token'];
  async function verify() {
    await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
    });
  }
  verify()
    .then(() => {
      next();
    })
    .catch(err => {
      res.send({isAuth:false})
    })
}

const login = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token;
  let user;
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    user = { name: payload?.given_name, surName: payload?.family_name, email: payload?.email, validateEmail: payload?.hd, fullName: payload?.name }

  }
  verify().then(async () => {
    //if (user.validateEmail === "trelleborgsscoutkar.se"|| user.email === 'izaxen@telia.com') {
    if (user.validateEmail === "trelleborgsscoutkar.se") {
      const valiDate: boolean = await validateLeader(user.name, user.surName)
      if(!valiDate) throw new Error('Not auth')
    }
    else throw new Error('Not Auth')

  }).then(() => {
    res.cookie('Session-Token', token, { httpOnly: true });
    res.send({ isAuth: true, user: { userName: user.fullName, unit: getActiveUser()[0].unit } })
    next();

  }).catch(err => {
    res.send({ isAuth: false })
  })
}



export {authenticate, login};