/* eslint-disable import/prefer-default-export */
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

export async function getEmployee(employeeId: number) {
  Log.info(`Attempting to retrive Empolyee: ${employeeId}`);
  const employee: EmployeeSecure | undefined = await Database.getEmployee(employeeId);
  return employee;
}

export async function addEmployee(employee: Employee) {
  Log.info(`attempting to add Employeee:  ${employee.username}`);
  const result = await Database.addEmployee(employee);
  return result;
}

export async function updateEmployee(employee: Employee) {
  Log.info(`attempting to update Employeee:  ${employee.username}`);
  const result = await Database.updateEmployee(employee);
  return result;
}
