declare namespace Express {
  interface Request {
    identity: string;
    user: {}
  }

  interface User {
    preferred_username: string;
    nonce: string;
    name: string;
    aud: string;
    iss: string;
    iat: number;
    nbf: number;
    exp: number;
    aio: string;
    oid: string;
    sub: string;
    tid: string;
    uti: string;
    ver: string;
    rh: string;
  }
}