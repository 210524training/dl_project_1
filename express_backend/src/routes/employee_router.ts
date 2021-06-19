import express, { Router } from 'express';
import { report } from 'process';
import Log from '../log';
import Employee from '../models/employee';
import EmployeeSecure from '../models/employee_secure';
import * as EmployeeService from '../services/employee_service';

const EmployeeRouter = Router();

/**
 * Handles retriving current Employee.
 */
EmployeeRouter.get('/', async (req, res) => {
  Log.info('Request hit EmployeeRouter: get/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  Log.info(`${req.session.employee.username} is logged in`);
  res.json([req.session.employee]);
});

/**
 * Handles requests to get Employee by Id.
 */
EmployeeRouter.get('/:id', async (req, res) => {
  Log.info('Request hit EmployeeRouter: /:id ');
  // TODO: Implement the GET user by ID endpoint
  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const employeeId: number = Number.parseInt(req.params.id, 10);
  Log.debug(`Recived ${employeeId}`);
  const employee = await EmployeeService.getEmployee(employeeId);

  if(employee) {
    res.json([employee]);
  }
  res.sendStatus(404);
});

/**
 * Handles requests to add Employees.
 */
EmployeeRouter.post('/', async (req: express.Request<unknown, unknown, Employee, unknown, {}>, res) => {
  Log.info('Request hit EmployeeRouter: post/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const result: boolean = await EmployeeService.addEmployee(req.body as Employee);

  if(result) {
    res.sendStatus(202);
  } else {
    res.sendStatus(500);
  }
});

/**
 * Handles requests to update an Employee.
 */
EmployeeRouter.patch('/', async (req: express.Request<unknown, unknown, Employee, unknown, {}>, res) => {
  Log.info('Request hit EmployeeRouter: patch/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const result: boolean = await EmployeeService.updateEmployee(req.body as Employee);

  if(result) {
    res.sendStatus(202);
  } else {
    res.sendStatus(500);
  }
});

export default EmployeeRouter;
