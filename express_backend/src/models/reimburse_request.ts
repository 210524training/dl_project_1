import { RequestStatus, RequestEvent } from './my_types';

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
 * @param status The status of the request (RequestStatus)
 * @param extraNotes Any extra notes. (string[])
 */
export default class ReimbursmentRequest {
  constructor(
    public requestId: number,
    public employeeId: number,
    public eventType: RequestEvent,
    public eventLocation: string,
    public eventDate: string,
    public eventTime: string,
    public eventCost: number,
    public status: RequestStatus,
    public extraNotes: string[] = [],
  ) {}
}

// const notes: string[] = ['note1', 'note2'];
// const request = new ReimbursmentRequest(1, 1, 'Certification',
// 'eventLocation', 'eventDate', 'eventTime', 100, 'Approved - Pending Grades', notes);
