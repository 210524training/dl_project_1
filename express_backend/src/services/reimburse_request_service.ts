/* eslint-disable import/prefer-default-export */
// handels the reimbursment request logic
import * as Database from './database_service';
import Log from '../log';
import ReimbursementRequest from '../models/reimburse_request';
import Employee from '../models/employee';
import { Department } from '../models/my_types';
import EmployeeSecure from '../models/employee_secure';

/**
 * Retrives a ReimbursmentRequest from the Database.
 * @param reimburseId ReimbursmentId of the Reimbursment to be retrived.
 * @returns Boolean - false on error
 */
export async function getReimburseRequest(reimburseId: number): Promise<ReimbursementRequest | undefined> {
  Log.info(`Attempting to retrive ReimburseRequest: ${reimburseId}`);
  const reimburseRequest = await Database.getRequest(reimburseId);
  console.log(reimburseRequest?.myRequestId);
  return reimburseRequest;
}

/**
 * Retrives ReimbursmentRequests by EmployeeId.
 * @param employeeId EmployeeId of the Requests to be retrived.
 * @returns ReimbursmentRequest[] | undefined
 */
export async function getMyRequests(employeeId: number): Promise<ReimbursementRequest[] | undefined> {
  Log.info(`Attempting to retrive current Employees: ${employeeId} ReimbursmentRequests.`);
  const reimburseRequests = await Database.getMyRequests(employeeId);
  return reimburseRequests;
}

/**
 * Adds a ReimbursmentRequest to the Database.
 * @param reimburseRequest Object to be added.
 * @returns Boolean - false on error
 */
export async function addReimbursRequest(reimburseRequest: ReimbursementRequest): Promise<boolean> {
  console.log(typeof (reimburseRequest));
  Log.info(`Attempting to add ReimbursemntRequest:  ${reimburseRequest.myRequestId} to the database.`);
  const result = await Database.addRequest(reimburseRequest);
  return result;
}

/**
 * Updates a ReimbursmentRequest in the database.
 * @param reimburseRequest object to be updated.
 * @returns Boolean - false on error
 */
export async function updateReimbursRequest(reimburseRequest: ReimbursementRequest): Promise<boolean> {
  Log.info(`Attempting to add ReimbursemntRequest:  ${reimburseRequest.myRequestId} to the database.`);
  const result = await Database.updateRequest(reimburseRequest);
  return result;
}

export async function findManagersEmployees(managerId: number, department: Department): Promise<Number[]> {
  Log.info(`Attempting to find employees of manager: ${managerId}`);
  // find all mangers employees
  const departmentEmployees: EmployeeSecure[] | undefined = await Database.getEmployeesByDepartment(department);
  // eslint-disable-next-line prefer-const
  let managersEmployees: Number[] = [];
  departmentEmployees?.forEach((employee) => {
    if(employee.managerId === managerId) {
      managersEmployees.push(employee.employeeId);
    }
  });
  return managersEmployees;
}

export async function findDepartmentEmployees(department: Department): Promise<Number[]> {
  Log.info(`Attempting to find employees of department: ${department}`);
  // find all mangers employees
  const departmentEmployees: EmployeeSecure[] | undefined = await Database.getEmployeesByDepartment(department);
  // eslint-disable-next-line prefer-const
  let departmentEmployeesId: Number[] = [];
  departmentEmployees?.forEach((employee) => {
    if(!departmentEmployeesId.includes(employee.employeeId)) {
      departmentEmployeesId.push(employee.employeeId);
    }
  });
  return departmentEmployeesId;
}

export async function getManagerTodo(managerId: number, department: Department) {
  Log.info(`Attempting to get all requests that need the manager: ${managerId}'s approval.`);
  const result: ReimbursementRequest[] | undefined = await Database.getPendingManager(managerId);
  const managersEmployees: Number[] = await findManagersEmployees(managerId, department);
  // eslint-disable-next-line prefer-const
  let response: ReimbursementRequest[] = [];
  result?.forEach((element) => {
    if(managersEmployees.includes(element.employeeId)) {
      response.push(element);
    }
  });
  return response;
}

export async function getDepartmentHeadTodo(departHeadId: number, department: Department) {
  Log.info(`Attempting to get all requests that need departmentHead: ${departHeadId}'s approval.`);
  const result: ReimbursementRequest[] | undefined = await Database.getPendingDepartmentHead(departHeadId);
  const departmentEmployees: Number[] = await findDepartmentEmployees(department);
  // eslint-disable-next-line prefer-const
  let response: ReimbursementRequest[] = [];
  result?.forEach((element) => {
    if(departmentEmployees.includes(element.employeeId)) {
      response.push(element);
    }
  });
  return response;
}

export async function getBencoTodo(bencoId: number) {
  Log.info(`Attempting to get all requests that need benco: ${bencoId}'s approval.`);
  const result: ReimbursementRequest[] | undefined = await Database.getPendingBenco(bencoId);
  return result;
}
