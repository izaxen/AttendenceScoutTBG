import { getActiveUser } from '../middleware/setIdentity';
import { MeetingBase, Meeting, MeetingAttendents, MeetingCollection } from '../models/meeting';
import { updateMeetingRepo, createNewMeetingRepo, getActiveMeetingsRepo, saveMeetingAttendentsRepo, getAllUnitsRepo, saveMeetingTempAttendentsRepo } from '../repositories/meetingRepositories'

function updateMeeting(updatedMeeting: Meeting) {
  updateMeetingRepo({ ...updatedMeeting, unit: getActiveUser()[0].unit })
}

function createNewMeeting(meetingDetails: MeetingBase) {
  createNewMeetingRepo({
    ...meetingDetails, unit: getActiveUser()[0].unit
  })
}

function getActiveMeetings() {
  return getActiveMeetingsRepo(getActiveUser()[0].unit);
}

function saveMeetingAttendents(attendents: MeetingCollection) {
  const saveMeeting = attendents.attendents.map(element => {
    return {
      eventID: attendents.eventID,
      attendentID: element
    }
  });
  Promise.all(saveMeeting);

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


  
export { updateMeeting, createNewMeeting, getActiveMeetings, saveMeetingAttendents, getAllUnits }