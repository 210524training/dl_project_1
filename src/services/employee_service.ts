// handles user logic
import * as Database from './database_service';
import Employee from '../models/employee';
import EmployeeSecure from '../models/employee_secure';
import Log from '../log';

/* export default function Login(username: string, password: string) {
  Log.info(`Attempting to check login credintials for Empolyee: ${username}`);
  const employee: EmployeeSecure | undefined = await Database.checkLogin(username, password);

  if(employee) {
    return employee;
  }
  return
} */
