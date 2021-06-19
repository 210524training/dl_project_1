/* eslint-disable import/prefer-default-export */
// handels the reimbursment request logic
import * as Database from './database_service';
import ReimbursmentRequest from '../models/reimburse_request';
import Log from '../log';

/**
 * Retrives a ReimbursmentRequest from the Database.
 * @param reimburseId ReimbursmentId of the Reimbursment to be retrived.
 * @returns Boolean - false on error
 */
export async function getReimburseRequest(reimburseId: number) {
  Log.info(`Attempting to retrive ReimburseRequest: ${reimburseId}`);
  const reimburseRequest = await Database.getRequest(reimburseId);
  return reimburseRequest;
}

/**
 * Retrives ReimbursmentRequests by EmployeeId.
 * @param employeeId EmployeeId of the Requests to be retrived.
 * @returns ReimbursmentRequest[] | undefined
 */
export async function getMyRequests(employeeId: number) {
  Log.info(`Attempting to retrive current Employees: ${employeeId} ReimbursmentRequests.`);
  const reimburseRequests = await Database.getMyRequests(employeeId);
  return reimburseRequests;
}

/**
 * Adds a ReimbursmentRequest to the Database.
 * @param reimburseRequest Object to be added.
 * @returns Boolean - false on error
 */
export async function addReimbursRequest(reimburseRequest: ReimbursmentRequest) {
  Log.info(`Attempting to add ReimbursemntRequest:  ${reimburseRequest.requestId} to the database.`);
  const result = await Database.addRequest(reimburseRequest);
  return result;
}

/**
 * Updates a ReimbursmentRequest in the database.
 * @param reimburseRequest object to be updated.
 * @returns Boolean - false on error
 */
export async function updateReimbursRequest(reimburseRequest: ReimbursmentRequest) {
  Log.info(`Attempting to add ReimbursemntRequest:  ${reimburseRequest.requestId} to the database.`);
  const result = await Database.updateRequest(reimburseRequest);
  return result;
}
