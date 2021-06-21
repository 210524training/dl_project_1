import Employee from './models/employee';
import ReimbursmentRequest from './models/reimburse_request';
import * as DAO from './services/database_service';

const notes: string[] = ['note1', 'note2'];
const request = new ReimbursmentRequest(557, 3, 'Seminar', 'eventLocation', 'eventDate', 'eventTime', 100, 'Pending Managers Approval', notes);
const request1 = new ReimbursmentRequest(4155, 3, 'Cerification Prep-Class', 'eventLocation', 'eventDate', 'eventTime', 100, 'Pending Managers Approval', notes);

async function test() {
  const result = await DAO.addRequest(request);
  const result1 = await DAO.addRequest(request1);
  console.log(result);
  console.log(result1);
}

test();
