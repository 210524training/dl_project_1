import Employee from './models/employee';
import ReimbursmentRequest from './models/reimburse_request';
import * as DAO from './services/database_service';
import * as ReimbursementService from './services/reimburse_request_service';

const notes: string[] = ['note1', 'note2'];
const request = new ReimbursmentRequest(557, 3, 'Seminar', 'eventLocation', 'eventDate', 'eventTime', 100, 'Pending Managers Approval', notes);
const request1 = new ReimbursmentRequest(4155, 3, 'Cerification Prep-Class', 'eventLocation', 'eventDate', 'eventTime', 100, 'Pending Managers Approval', notes);

async function test() {
  // await ReimbursementService.addReimbursRequest(request);
  // await ReimbursementService.addReimbursRequest(request);
  await ReimbursementService.getReimburseRequest(557);
}

test();
