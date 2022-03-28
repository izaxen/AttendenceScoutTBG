export interface MeetingBase{
  activity: string,
  place: string,
  fromDate: Date,
  toDate: Date,
  unit:string
}
export interface Meeting extends MeetingBase{
  id:number
}

export interface MeetingAttendents{
  eventID: number,
  attendentID:string
}

export interface MeetingCollection{
  eventID: number,
  attendents:[]
}

export interface MeetingID{
 eventID:number
}