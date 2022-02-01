export interface AttendentBase {
  name?: string,
  surName?: string,
  personalData?: number,
  sex?: string,
  unit?: string
}

export interface TempAttendent extends AttendentBase {
  id?: string
  unitRole?: string
}

export interface Attendent extends AttendentBase {
  id: number,
  unitRole?:string
}

export interface LeaderList{
  first_name?: {},
  last_name?: {},
  email?: {},
  extra_emails?: {},
  member_no?: {},
  contact_mobile_phone?: {},
  contact_email_dad?: {}
  contact_email_mum?:{}
}

export interface BaseLeader{
  name: string,
  surName: string,
}

export interface Leader extends BaseLeader {
  email: string,
  memberNo: string,
  unit: string,
}