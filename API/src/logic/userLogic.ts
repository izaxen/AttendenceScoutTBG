import { Attendent, AttendentBase, Leader, TempAttendent } from '../models/attendents'
import { createTempAttendentRepo, createAttendentRepo, getUnitMembersRepo, getTempAttendentsRepo, addLeadersToDBRepo, getUnitLeadersRepo, validateLeaderRepo } from '../repositories/userRepositories'
import { setAllUnitRepo } from '../repositories/meetingRepositories'
import { setActiveUser, getActiveUser } from '../middleware/setIdentity'

function createTempAttendent(tempAttendent: AttendentBase) {
  let tempAtt: TempAttendent = { ...tempAttendent, id: createNewIdTempAttendent(), unit: getActiveUser()[0]['unit'] }
  createTempAttendentRepo(tempAtt)
}

async function createAttendent(tempAttendent: Attendent) {
  await createAttendentRepo(tempAttendent)
}

function createNewIdTempAttendent() {
  return "temp" + Date.now();
}

async function getUnitMembers() {
  return getUnitMembersRepo(getActiveUser()[0]['unit']);
}

async function getTempAttendents() {
  return getTempAttendentsRepo(getActiveUser()[0]['unit']);
}

function addLeadersToDB(leader: Leader) {
  return addLeadersToDBRepo(leader);
}

async function getUnitLeaders() {
  return getUnitLeadersRepo(getActiveUser()[0]['unit'])
}

async function validateLeader(name: string, surName: string) {
  const leader: Leader = await validateLeaderRepo(name, surName);
  setActiveUser(leader)
  if (getActiveUser()) return true

  else return false;
}

async function createAllUnits(unit: string) {
  await setAllUnitRepo(unit);
}


export { createTempAttendent, createAttendent, getUnitMembers, getTempAttendents, addLeadersToDB, validateLeader, getUnitLeaders,createAllUnits }