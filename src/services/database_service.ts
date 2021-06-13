/* eslint-disable max-len */
/* eslint-disable import/prefer-default-export */
// handles database interaction
import * as AWS from 'aws-sdk';
import Log from '../log';
import Employee from '../models/employee';
import EmployeeSecure from '../models/employee_secure';
import ReimbursmentRequest from '../models/reimburse_request';
import { Department } from '../models/my_types';

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
    Log.info(`Added Employee: ${employee.username} without an error.`);

    // console.log('success');
    return true;
  } catch(error) {
    Log.error(`Error on addEmployee: ${employee.username} attempt. `, error);
    return false;
  }
}

/**
 * Update an employee in the employee table.
 * @param employee Object to update in the table. (Employee)
 * @returns Boolean - false on error
 */
export async function updateEmployee(employee: Employee): Promise<boolean> {
  // console.log(car.price);

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'P1_Employees',
    Item: employee,
  };

  try {
    await docClient.put(params).promise();
    Log.info(`Updated Employee: ${employee.username} without an error.`);

    // console.log('success');
    return true;
  } catch(error) {
    Log.error(`Error on updateEmployee: ${employee.username} attempt. `, error);
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
    Log.info(`Added Request: ${request.requestId} without an error.`);

    // console.log('success');
    return true;
  } catch(error) {
    Log.error(`Error on addRequest: ${request.requestId} attempt. `, error);
    return false;
  }
}

/**
 * Updates a reimbursment request in the requests table.
 * @param request Object to updated in the table. (ReimbursmentRequest)
 * @returns Boolean - false on error
 */
export async function updateRequest(request: ReimbursmentRequest): Promise<boolean> {
  // console.log(car.price);

  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: 'P1_Requests',
    Item: request,
  };

  try {
    await docClient.put(params).promise();
    Log.info(`Updated Request: ${request.requestId} without an error.`);

    // console.log('success');
    return true;
  } catch(error) {
    Log.error(`Error on updateRequest: ${request.requestId} attempt. `, error);
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
      employeeId: inputId,
    },
    ProjectionExpression: '#id, #u, #d, #fn, #ls, #r, #m',
    ExpressionAttributeNames: {
      '#id': 'employeeId',
      '#u': 'username',
      '#d': 'department',
      '#fn': 'firstName',
      '#ls': 'lastName',
      '#r': 'role',
      '#m': 'managerId',
    },
  };

  try {
    const returnEmployee = await docClient.get(params).promise();

    if(returnEmployee.Item?.employeeId) {
      Log.info(`Retrived Employee: ${returnEmployee.Item.username} with out an error.`);

      return returnEmployee.Item as EmployeeSecure | undefined;
    }
  } catch(error) {
    Log.error(`Error on getEmployee: ${inputId} attempt. `, error);
    return undefined;
  }
  Log.info(`Did not find Employee: ${inputId}`);
  return undefined;
}

/**
 * Retrives an request from the requests table by requestId.
 * @param inputId The requestId of the request that will be retrived. (number)
 * @returns ReimbursmentRequest | undefined
 */
export async function getRequest(inputId: number): Promise<ReimbursmentRequest | undefined> {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: 'P1_Requests',
    Key: {
      Request_ID: inputId,
    },
    ProjectionExpression: '#id, #eid, #etp, #el, #ed, #etm, #ec, #st, #en',
    ExpressionAttributeNames: {
      '#id': 'requestId',
      '#eid': 'employeeId',
      '#etp': 'eventType',
      '#el': 'eventLocation',
      '#ed': 'eventDate',
      '#etm': 'eventTime',
      '#ec': 'eventCost',
      '#st': 'status',
      '#en': 'extraNotes',
    },
  };

  try {
    const returnRequest = await docClient.get(params).promise();

    if(returnRequest.Item?.employeeId) {
      Log.info(`Retrived Request: ${returnRequest.Item.requestId} with out an error.`);

      return returnRequest.Item as ReimbursmentRequest | undefined;
    }
  } catch(error) {
    Log.error(`Error on getRequest: ${inputId} attempt. `, error);
    return undefined;
  }
  Log.info(`Did not find request: ${inputId}`);
  return undefined;
}

/**
 * Retrives all requests of an employee.
 * @param inputId The EmployeeId of the requests that will be retrived. (number)
 * @returns ReimbursmentRequest[] | undefined
 */
export async function getMyRequests(inputId: number): Promise<ReimbursmentRequest[] | undefined> {
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'P1_Requests',
    FilterExpression: '#eid = : eid',
    ExpressionAttributeNames: {
      '#eid': 'employeeId',
    },
    ExpressionAttributeValues: {
      ':eid': inputId,
    },
  };

  try {
    const returnRequest = await docClient.scan(params).promise();
    const requests = returnRequest.Items as ReimbursmentRequest[];
    if(requests.length > 0) {
      Log.info(`Retrived Request: ${requests[0].requestId} with out an error.`);

      return requests as ReimbursmentRequest[] | undefined;
    }
  } catch(error) {
    Log.error(`Error on getRequest: ${inputId} attempt. `, error);
    return undefined;
  }
  Log.info(`Did not find request: ${inputId}`);
  return undefined;
}

/**
 * Retrives all employees in a department.
 * @param department (Department)
 * @returns EmployeeSecure[] | undefined
 */
// eslint-disable-next-line max-len
export async function getEmployeesByDepartment(department: Department): Promise<EmployeeSecure[] | undefined> {
  //
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'P1_Employees',
    FilterExpression: '#e = :e',
    ExpressionAttributeValues: {
      ':e': department,
    },
    ExpressionAttributeNames: {
      '#e': 'department',
    },
  };
  try {
    const result = await docClient.scan(params).promise();
    const employees: EmployeeSecure[] = result.Items as EmployeeSecure[];

    if(employees.length > 0) {
      Log.info(`Retrived employees from ${department} with out an error.`);
      return employees;
    }
  } catch(error) {
    Log.error(`Error on getEmployeesByDepartment: ${department} attempt. `, error);
  }
  Log.info(`Did not find employees from Department: ${department}`);
  return undefined;
}
// get requests by employee

export async function checkLogin(username: string, password: string): Promise<EmployeeSecure | undefined> {
  //
  const params: AWS.DynamoDB.DocumentClient.ScanInput = {
    TableName: 'P1_Employees',
    ProjectionExpression: '#id, #u, #d, #fn, #ls, #r, #m',
    FilterExpression: '#u = :u AND #p = :p',
    ExpressionAttributeValues: {
      ':u': username,
      ':p': password,
    },
    ExpressionAttributeNames: {
      '#id': 'employeeId',
      '#u': 'username',
      '#p': 'password',
      '#d': 'department',
      '#fn': 'firstName',
      '#ls': 'lastName',
      '#r': 'role',
      '#m': 'managerId',
    },
  };
  try {
    const result = await docClient.scan(params).promise();
    const employees: EmployeeSecure[] = result.Items as EmployeeSecure[];

    if(employees.length > 0) {
      Log.info(`Successfuly found Employee: ${username} with out an error.`);
      console.log(employees[0]);
      return employees[0];
    }
  } catch(error) {
    Log.error(`Error on checkLogin: ${username} attempt. `, error);
  }
  Log.info(`Did not find 'Employee: ${username}`);
  return undefined;
}
