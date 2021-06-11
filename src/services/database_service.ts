/* eslint-disable import/prefer-default-export */
// handles database interaction
import * as AWS from 'aws-sdk';
import Log from '../log';
import Employee from '../models/employee';
import EmployeeSecure from '../models/employee_secure';
import ReimbursmentRequest from '../models/reimburse_request';

const docClient = new AWS.DynamoDB.DocumentClient({
  region: 'us-west-2',
  endpoint: 'https://dynamodb.us-west-2.amazonaws.com',
  apiVersion: 'latest',
});

/**
 * Adds an employee to the employee table.
 * @param employee Object to add to the table. (Employee)
 * @returns Boolean - false on error
 */
export async function addEmployee(employee: Employee): Promise<boolean> {
  // console.log(car.price);

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'P1_Employees',
    Item: employee,
  };

  try {
    await docClient.put(params).promise();
    Log.debug(`Added Employee: ${employee.username} without an error.`);

    // console.log('success');
    return true;
  } catch(error) {
    Log.error(`Error on addEmployee: ${employee.username} attempt. `, error);
    return false;
  }
}

/**
 * Adds an reimbursment request to the requests table.
 * @param request Object to add to the table. (ReimbursmentRequest)
 * @returns Boolean - false on error
 */
export async function addRequest(request: ReimbursmentRequest): Promise<boolean> {
  // console.log(car.price);

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'P1_Requests',
    Item: request,
  };

  try {
    await docClient.put(params).promise();
    Log.debug(`Added Request: ${request.requestId} without an error.`);

    // console.log('success');
    return true;
  } catch(error) {
    Log.error(`Error on addReouest: ${request.requestId} attempt. `, error);
    return false;
  }
}

/**
 * Retrives an employee from the employee table by employeeID.
 * @param inputId The employeeId of the employee that will be retrived. (number)
 * @returns EmployeeSecure | undefined
 */
export async function getEmployee(inputId: number): Promise<EmployeeSecure | undefined> {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: 'P1_Employees',
    Key: {
      Employee_Id: inputId,
    },
    ProjectionExpression: '#id, #u, #d, #fn, #ls, #m',
    ExpressionAttributeNames: {
      '#id': 'employeeId',
      '#u': 'username',
      '#d': 'department',
      '#fn': 'firstName',
      '#ls': 'lastName',
      '#m': 'managerId',
    },
  };

  try {
    const returnEmployee = await docClient.get(params).promise();

    if(returnEmployee.Item?.employeeId) {
      Log.debug(`Retrived Employee: ${returnEmployee.Item.username} with out an error.`);

      return returnEmployee.Item as EmployeeSecure | undefined;
    }
  } catch(error) {
    Log.error(`Error on getEmployee: ${inputId} attempt. `, error);
    return undefined;
  }
  return undefined;
}

/**
 * Retrives an request from the requests table by requestId.
 * @param inputId The requestId of the request that will be retrived. (number)
 * @returns ReimbursmentRequest | undefined
 */
export async function getrequest(inputId: number): Promise<ReimbursmentRequest | undefined> {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: 'P1_Requests',
    Key: {
      Request_ID: inputId,
    },
    ProjectionExpression: '#id, #eid, #etp, #el, #ed, #etm, #ec, #en',
    ExpressionAttributeNames: {
      '#id': 'requestId',
      '#eid': 'employeeId',
      '#etp': 'eventType',
      '#el': 'eventLocation',
      '#ed': 'eventDate',
      '#etm': 'eventTime',
      '#ec': 'eventCost',
      '#en': 'extraNotes',
    },
  };

  try {
    const returnRequest = await docClient.get(params).promise();

    if(returnRequest.Item?.employeeId) {
      Log.debug(`Retrived Request: ${returnRequest.Item.requestId} with out an error.`);

      return returnRequest.Item as ReimbursmentRequest | undefined;
    }
  } catch(error) {
    Log.error(`Error on getRequest: ${inputId} attempt. `, error);
    return undefined;
  }
  return undefined;
}
