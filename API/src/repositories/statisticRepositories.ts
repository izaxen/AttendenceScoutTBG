import { StatisticDate, StatisticUnits } from "../models/statistic";
import { getDb } from "../db/db"

const db = getDb();

async function getStatisticReportAllUnits() {
  const query = db.prepare(` SELECT * FROM statisticReportMember UNION SELECT * FROM statisticReportTempAttendent`);
  return query.all();
}

async function getStatisticPresensAllUnits() {
  const query = db.prepare(`SELECT * FROM statisticPresensMember UNION SELECT * FROM statisticPresensTempAttendent`);
  return query.all();
}

function getStatisticReportAllUnitsWithDates(dates: StatisticDate) {
  const query = db.prepare(` SELECT * FROM statisticReportMember UNION SELECT * FROM statisticReportTempAttendent WHERE fromDate >= ? AND toDate < = ?`);
  return query.all(dates.fromDate, dates.toDate);
}

function getStatisticReportSingelUnitWithDates(dateWithUnit: StatisticUnits) {
  const query = db.prepare(` SELECT * FROM statisticReportMember UNION SELECT * FROM statisticReportTempAttendent WHERE fromDate >= ? AND toDate < = ? AND unit = ?`);
  return query.all(dateWithUnit.fromDate, dateWithUnit.toDate, dateWithUnit.unit)
}

function getStatisticPresensAllUnitsWithDates(dates: StatisticDate) {
  const query = db.prepare(`SELECT * FROM statisticPresensMember UNION SELECT * FROM statisticPresensTempAttendent WHERE fromDate >= ? AND toDate < = ?`);
  return query.all(dates.fromDate, dates.toDate);
}

function getStatisticPresensSingleUnitWithDates(dateWithUnit: StatisticUnits) {
  const query = db.prepare(`SELECT * FROM statisticPresensMember UNION SELECT * FROM statisticPresensTempAttendent WHERE fromDate >= ? AND toDate < = ?`);
  query.all(dateWithUnit.fromDate, dateWithUnit.toDate, dateWithUnit.unit)
}


export const statisticRepo = { getStatisticReportAllUnits, getStatisticPresensAllUnits }
