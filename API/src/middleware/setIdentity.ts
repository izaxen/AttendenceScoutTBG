import {Leader} from '../models/attendents'
let activeUser: Leader;

export function setActiveUser(user:Leader) {
  activeUser = user;
}
export function getActiveUser() {
  return activeUser;
}
