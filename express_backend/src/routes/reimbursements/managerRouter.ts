/* eslint-disable max-len */
import express, { request, Router } from 'express';
import Log from '../../log';
import { Role } from '../../models/my_types';
import ReimbursmentRequest from '../../models/reimburse_request';
import { addRequest } from '../../services/database_service';
import * as ReimburseService from '../../services/reimburse_request_service';

const ManagerRouter = Router();

/**
 * Handles requests to get all requests that need current managers approval.
 */
ManagerRouter.get('/', async (req, res) => {
  Log.info('Request hit ManagerRouter: get/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }
  if(req.session.employee.role !== 'Manager') {
    throw new Error('You must be a manager to access this functionality');
  }

  const { employeeId, department } = req.session.employee;
  Log.debug(`Current userId: ${employeeId}`);
  const reimbursements = await ReimburseService.getManagerTodo(employeeId, department);

  if(reimbursements[0]) {
    Log.info('Sent response to client.');
    res.json(reimbursements);
  } else {
    Log.info('Sent error status to client.');
    res.sendStatus(404);
  }
});

/**
* Handles requests to update a requests that needs current managers approval.
*/
ManagerRouter.patch('/', async (req: express.Request<unknown, unknown, { requestId: string, role: any }, unknown, {}>, res) => {
  Log.info('Request hit ManagerRouter: patch/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }
  if(req.session.employee.role !== 'Manager') {
    throw new Error('You must be a manager to access this functionality');
  }

  const { requestId, role } = req.body;
  Log.debug(`recived: ${requestId}, ${role}`);
  console.log(typeof (requestId));
  const result = await ReimburseService.getReimburseRequest(Number.parseInt(requestId, 10));
  if(result) {
    result.status = 'Pending DepartmentHeads Approval';
    await ReimburseService.updateReimbursRequest(result);
  }

  res.sendStatus(202);
});

export default ManagerRouter;
