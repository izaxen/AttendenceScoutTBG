import { Attendent, Leader, TempAttendent } from '../models/attendents';
import { getDb } from '../db/db'

const db = getDb();

async function createTempAttendentRepo(tempAttendent:TempAttendent) {
  const query = db.prepare('INSERT INTO tempAttendents(id, name, surName, personalData, sex, unit, unitRole,created) VALUES (?,?,?,?,?,?,?,?)');
  await query.run(tempAttendent.id, tempAttendent.name, tempAttendent.surName, tempAttendent.personalData,
    tempAttendent.sex, tempAttendent.unit, tempAttendent.unitRole, Date.now());
}
async function createAttendentRepo(tempAttendent:Attendent) {
  const query = db.prepare('INSERT OR REPLACE INTO attendents(id, name, surName, personalData, sex, unit, unitRole,created) VALUES (?,?,?,?,?,?,?,?)');
  await query.run(tempAttendent.id, tempAttendent.name, tempAttendent.surName, tempAttendent.personalData,
    tempAttendent.sex, tempAttendent.unit, tempAttendent.unitRole, Date.now());
}

async function getUnitMembersRepo(unit: string) {
  const query = db.prepare(`SELECT * FROM attendents WHERE unit = ?`);
  return query.all(unit);
}

async function getTempAttendentsRepo(unit: string) {
  const query = db.prepare(`SELECT * FROM tempAttendents WHERE unit = ?`);
  return query.all(unit)
}

async function addLeadersToDBRepo(leader: Leader) {
  const query = db.prepare(`INSERT OR REPLACE INTO unitLeaders(name, surName, email, unit, memberNo, created) VALUES (?,?,?,?,?,?)`)
  query.run(leader.name, leader.surName,leader.email, leader.unit, leader.memberNo, Date.now())
}

async function getLeadersRepo() {
  const query = db.prepare(`SELECT * FROM unitLeaders`);
  return query.all();
}

async function getUnitLeadersRepo(unit: string) {
  const query = db.prepare(`SELECT * FROM unitLeaders WHERE unit = ?`);
  return query.all(unit);
}

async function validateLeaderRepo(name: string, surName: string) {
  const query = db.prepare(`SELECT * FROM unitLeaders WHERE name = ? AND surName=?`);
  return query.all(name, surName);
  //Stoppa in if längden är mer än 1
}


export { createTempAttendentRepo, createAttendentRepo, getUnitMembersRepo, getTempAttendentsRepo, addLeadersToDBRepo, getLeadersRepo, getUnitLeadersRepo, validateLeaderRepo }