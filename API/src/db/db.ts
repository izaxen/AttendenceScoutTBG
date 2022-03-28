import axios, { AxiosResponse } from "axios";
import { createAttendent, addLeadersToDB, createAllUnits } from '../logic/userLogic'
import Database from 'better-sqlite3';
import { querysCreate, querysDrop } from './baseQuerys'


let db;

const getDb = () => {
  if (db) return db;
  return initDb();
}

const initDb = () => {
  if (db) return db;
  db = new Database('src/db/database.db');
  //checkAndInitTables();
  //splittApiUrl();
  //createDbFromScoutnet();
  return db;
}

const checkAndInitTables = () => {
  const viewStatistiscReportMember = db.prepare(querysCreate.createStatisticReportMemberView);
  const viewStatistiscPresensTempAttendent = db.prepare(querysCreate.createStatisticPresensTempAttendentView);
  const viewStatistiscPresensMember = db.prepare(querysCreate.createStatisticPresensMemberView);
  const viewStatistiscReportTempAttendent = db.prepare(querysCreate.createStatisticReportTempAttendentView);
  const attendents = db.prepare(querysCreate.createTableAttendents);
  const meetings = db.prepare(querysCreate.createTableMeetings);
  const tempAttendent = db.prepare(querysCreate.createTableTempAttendent);
  const meetingAttendent = db.prepare(querysCreate.createTableMeetingAttendents);
  const unitLeadersCreate = db.prepare(querysCreate.createTableUnitLeaders);
  const units = db.prepare(querysCreate.createTableUnits);

  const unitLeadersDrop = db.prepare(querysDrop.dropTableUnitLeaders);
  unitLeadersDrop.run();

  viewStatistiscPresensMember.run();
  viewStatistiscPresensTempAttendent.run();
  viewStatistiscReportMember.run();
  viewStatistiscReportTempAttendent.run();
  attendents.run();
  meetings.run();
  tempAttendent.run();
  meetingAttendent.run();
  unitLeadersCreate.run();
  units.run();
}

async function splittApiUrl() {
  const api: string = process.env.API_SCOUTNET!;
  let http: string[] = [process.env.API_SCOUTNET_GNUTTARNA as string, process.env.API_SCOUTNET_SLEMMISARNA as string, process.env.API_SCOUTNET_ROVDJUREN as string, process.env.API_SCOUTNET_ROVFAGLARNA as string, process.env.API_SCOUTNET_SKOGSFAGLARNA as string, process.env.API_SCOUTNET_BJORNARNA as string, process.env.API_SCOUTNET_INSEKTERNA as string, process.env.API_SCOUTNET_MULLE_MECK as string]

  const units = http.map(async unit => {
    const httpSplitt: string[] = unit.split("\,");
    await getLeadersFromScoutnet(api.concat(httpSplitt[0]), httpSplitt[1]);
    return httpSplitt[1];
  });

  Promise.all(units).then((results) => results.forEach((result) => setUnits(result)));

}

async function setUnits(units: string) {

  
}

async function getLeadersFromScoutnet(unitUrl: string, unit: string) {
  const leaderList: AxiosResponse = await axios.get(unitUrl);
  const leader = Object.entries(leaderList.data.data)
  leader.forEach(async (lead) => {
    await addLeadersToDB(createNewLeader(lead[1], unit))
  })
}

function createNewLeader(member: any, unit: string) {
  return {
    name: member.first_name!['value'],
    surName: member.last_name!['value'],
    email: member.email!['value'],
    unit: unit,
    memberNo: member.member_no!['value']
  }
}
async function createDbFromScoutnet() {
  const memberList: AxiosResponse = await axios.get(process.env.API_SCOUTNET as string);
  const member = Object.entries(memberList.data.data)
  member.forEach(element => {
    createAttendent(createNewAttendent(element[1]));
  });
};

function createNewAttendent(newMember: any) {
  let memberUnit: any;
  let memberSex: {};

  let member = {
    id: newMember['member_no']['value'],
    name: newMember['first_name']['value'],
    surName: newMember['last_name']['value'],
    personalData: newMember['date_of_birth']['value'],
    unitRole: 'unit_role' in newMember ? newMember['unit_role']['value'] : "Medlem"
  };
  memberSex = 'sex' in newMember ? { ...member, sex: newMember['sex']['value'] } : { ...member, sex: "None" };
  memberUnit = 'unit' in newMember ? { ...memberSex, unit: newMember['unit']['value'] } : { ...member, unit: "None" };

  return memberUnit;
}

export { initDb, getDb, createDbFromScoutnet as getDbFromScoutnet }