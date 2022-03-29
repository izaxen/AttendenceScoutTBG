const createStatisticReportMemberView: string = `CREATE VIEW IF NOT EXISTS statisticReportMember AS
    SELECT personaldata,
           eventId,
           a.id AS AttendentID,
           sex,
           fromDate,
           m.unit
      FROM meetingAttendents AS ma
           INNER JOIN
           meetings AS m ON m.id = ma.eventID
           INNER JOIN
           attendents AS a ON a.id = ma.attendentID;`

const createStatisticPresensMemberView: string = `CREATE VIEW IF NOT EXISTS statisticPresensMember AS
    SELECT 
           eventId,
           activity,
           place,
           fromDate,
           toDate,
           m.unit,
           name,
           surName,
           unitRole
           
      FROM meetingAttendents AS ma
           INNER JOIN
           meetings AS m ON m.id = ma.eventID
           INNER JOIN
           attendents AS a ON a.id = ma.attendentID;`

const createStatisticReportTempAttendentView: string = `CREATE VIEW IF NOT EXISTS statisticReportTempAttendent AS
    SELECT personaldata,
           eventId,
           t.id AS AttendentID,
           sex,
           fromDate,
           m.unit
      FROM meetingAttendents AS ma
           INNER JOIN
           meetings AS m ON m.id = ma.eventID
           INNER JOIN
           tempAttendents AS t ON t.id = ma.tempAttendentID;`

const createStatisticPresensTempAttendentView: string = `CREATE VIEW IF NOT EXISTS statisticPresensTempAttendent AS
    SELECT 
           eventId,
           activity,
           place,
           fromDate,
           toDate,
           m.unit,
           name,
           surName,
           unitRole
    
      FROM meetingAttendents AS ma
           INNER JOIN
           meetings AS m ON m.id = ma.eventID
           INNER JOIN
           tempAttendents AS t ON t.id = ma.tempAttendentID;`



const createTableAttendents: string = `CREATE TABLE IF NOT EXISTS attendents(id INTEGER PRIMARY KEY, name STRING, surName STRING, 
              personalData INTEGER, sex STRING, unit STRING, unitRole STRING, created TIMESTAMP)`

const createTableMeetings: string = `CREATE TABLE IF NOT EXISTS meetings(id INTEGER PRIMARY KEY, activity STRING, 
              place STRING, fromDate DATETIME, toDate DATETIME, unit STRING, created TIMESTAMP)`

const createTableTempAttendent: string = `CREATE TABLE IF NOT EXISTS tempAttendents(id STRING PRIMARY KEY, 
  name STRING, surName STRING, personalData INTEGER, sex STRING, unit STRING, unitRole STRING, created TIMESTAMP)`

const createTableMeetingAttendents: string = `CREATE TABLE IF NOT EXISTS meetingAttendents(eventID INTEGER REFERENCES meetings (id),
  attendentID STRING REFERENCES attendents (id), tempAttendentID STRING REFERENCES tempAttendents (id))`

const createTableUnitLeaders: string = `CREATE TABLE IF NOT EXISTS unitLeaders(id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, surName STRING,
  unit STRING, email STRING, memberNo STRING, created STRING)`

const createTableUnits: string = `CREATE TABLE IF NOT EXISTS units(id INTEGER PRIMARY KEY AUTOINCREMENT, unit STRING)`

const dropTableUnitLeaders: string = `DROP TABLE IF EXISTS unitLeaders`

const dropTableUnits: string = `DROP TABLE IF EXISTS units`

export const querysCreate = { createStatisticReportMemberView, createStatisticPresensMemberView, createStatisticReportTempAttendentView, createStatisticPresensTempAttendentView, createTableAttendents, createTableMeetings, createTableTempAttendent, createTableMeetingAttendents, createTableUnitLeaders, createTableUnits }
export const querysDrop = { dropTableUnitLeaders, dropTableUnits }
