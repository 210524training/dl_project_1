export type Event = 'University Course' | 'Seminar' | 'Cerification Prep-Class' | 'Certification' | 'Technical Training' | 'Other';

/**
 * Models a reimbursment request
 *
 * @param requestId Used as the hash key in the request table. (number)
 * @param employeeId EmployeeId of the employee that submited the request (number)
 * @param eventType (Event)
 * @param eventLocation (string)
 * @param eventDate (string)
 * @param eventTime (string)
 * @param eventCost (number)
 * @param extraNotes Any extra notes. (string[])
 */
export default class ReibursmentRequest {
  constructor(
    public requestId: number,
    public employeeId: number,
    public eventType: Event,
    public eventLocation: string,
    public eventDate: string,
    public eventTime: string,
    public eventCost: number,
    public extraNotes: string[] = [],
  ) {}
}
