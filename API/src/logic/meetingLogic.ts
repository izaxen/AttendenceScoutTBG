import { getActiveUser } from '../middleware/setIdentity';
import { MeetingBase, Meeting, MeetingAttendents, MeetingCollection, MeetingID } from '../models/meeting';
import { updateMeetingRepo, createNewMeetingRepo, getActiveMeetingsRepo, saveMeetingAttendentsRepo, getAllUnitsRepo, saveMeetingTempAttendentsRepo, getReportedMeetingsRepo, getMeetingAttendentsRepo } from '../repositories/meetingRepositories'

function updateMeeting(updatedMeeting: Meeting) {
  updateMeetingRepo({ ...updatedMeeting, unit: getActiveUser()[0].unit })
}

function createNewMeeting(meetingDetails: MeetingBase) {
  createNewMeetingRepo({
    ...meetingDetails, unit: getActiveUser()[0].unit
  })
}

async function getActiveMeetings() {
  return getActiveMeetingsRepo(getActiveUser()[0].unit);
}

function saveMeetingAttendents(attendents: MeetingCollection) {
  const saveMeeting = attendents.attendents.map(element => {
    return {
      eventID: attendents.eventID,
      attendentID: element
    }
  });

  saveMeeting.forEach(async (attendent: MeetingAttendents) => {
    if (typeof attendent.attendentID === 'number') {
      await saveMeetingAttendentsRepo(attendent)
    }
    else await saveMeetingTempAttendentsRepo(attendent)
  });
}

async function getAllUnits() {
  return getAllUnitsRepo()
}

async function sortReportedMeeting(reported: boolean) {
  const eventID: MeetingID[] = await getReportedMeetingsRepo();
  const meetings: Meeting[] = await getActiveMeetings();

  const newId: number[] = eventID.map(event => {
    return event.eventID
  })
  if (reported) {
    return meetings.map((meeting: Meeting) => {
      if (newId.includes(meeting.id)) return meeting;
    }).filter((element) => {
      return element !== undefined;
    });
  }
  
  else {
    return meetings.map((meeting: Meeting) => {
      if (!newId.includes(meeting.id)) {
        return meeting;
      }
    }).filter((element) => {
      return element !== undefined;
    });
  }
}

async function getReportedMeetings() {
return sortReportedMeeting(true)  
  
}
async function getUnreportedMeetings() {
  return sortReportedMeeting(false);
}

async function getMeetingAttendents(meetingID: number) {
  console.log(meetingID);
  
  return getMeetingAttendentsRepo(meetingID);
}


  
export { updateMeeting, createNewMeeting, getActiveMeetings, saveMeetingAttendents, getAllUnits, getReportedMeetings, getUnreportedMeetings, getMeetingAttendents }