import { MeetingAttendents, Meeting, MeetingBase } from '../models/meeting';
import { getDb } from '../db/db'
const db = getDb();

async function updateMeetingRepo(updatedMeeting: Meeting) {
  const query = db.prepare(`UPDATE meetings SET activity=?, place=?, fromDate=?, toDate=?, unit=?, created=? WHERE id ==?`);
  await query.run(updatedMeeting.activity, updatedMeeting.place, updatedMeeting.fromDate, updatedMeeting.toDate, updatedMeeting.unit, Date.now(), updatedMeeting.id)
}

async function createNewMeetingRepo(newMeeting: MeetingBase) {
  const query = db.prepare('INSERT INTO meetings(activity, place, fromDate, toDate, unit, created) VALUES (?,?,?,?,?,?)');
  await query.run(newMeeting.activity, newMeeting.place, newMeeting.fromDate, newMeeting.toDate, newMeeting.unit, Date.now());
}

async function getActiveMeetingsRepo(unit: string) {
  const query = db.prepare(`SELECT * FROM meetings WHERE unit = ?`);
  return query.all(unit);
}

async function saveMeetingAttendentsRepo(attendent: MeetingAttendents) {
  await clearAttendentsToMeeting(attendent)
  const query = db.prepare(`INSERT OR REPLACE INTO meetingAttendents(eventID, attendentID) VALUES (?,?)`);
  query.run(attendent.eventID, attendent.attendentID);
}
async function saveMeetingTempAttendentsRepo(attendent: MeetingAttendents) {
  await clearAttendentsToMeeting(attendent)
  const query = db.prepare(`INSERT OR REPLACE INTO meetingAttendents(eventID, tempAttendentID) VALUES (?,?)`);
  query.run(attendent.eventID, attendent.attendentID);
}


async function clearAttendentsToMeeting(event: MeetingAttendents) {
  const query = db.prepare(`DELETE FROM meetingAttendents WHERE eventID = ?`);
  query.run(event.eventID);
}

async function getAllUnitsRepo() {
  const query = db.prepare(`SELECT * FROM units`);
  return query.all();
}

/*async function setAllUnitRepo(unit: string) {
//  const query = db.prepare('INSERT OR REPLACE INTO units(unit) VALUES(?)')
//  query.run(unit)
}*/

async function getReportedMeetingsRepo() {
  const query = db.prepare(`SELECT DISTINCT eventID FROM meetingAttendents`)
  return query.all();
}

async function getMeetingAttendentsRepo(meetingID: number) {
  console.log(meetingID);
  
  const query = db.prepare(`SELECT * FROM meetingAttendents WHERE eventID =? `)
  return query.all(meetingID)
}

export { updateMeetingRepo, createNewMeetingRepo, getActiveMeetingsRepo, saveMeetingAttendentsRepo, getAllUnitsRepo, saveMeetingTempAttendentsRepo, getReportedMeetingsRepo, getMeetingAttendentsRepo }


