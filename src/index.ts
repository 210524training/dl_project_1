import Employee from './models/employee';
import ReimbursmentRequest from './models/reimburse_request';
import * as DAO from './services/database_service';

async function test() {
  const result = await DAO.getEmployeesByDepartment('Human Resoures');
  console.log(result);
}

test();
