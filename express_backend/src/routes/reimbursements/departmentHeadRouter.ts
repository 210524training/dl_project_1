import express, { Router } from 'express';
import Log from '../../log';
import * as ReimburseService from '../../services/reimburse_request_service';

const DepartmentHeadRouter = Router();

/**
 * Handles requests to get all requests that need current managers approval.
 */
DepartmentHeadRouter.get('/', async (req, res) => {
  Log.info('Request hit DepartmentHeadRouter: get/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }
  if(req.session.employee.role !== 'DepartmentHead') {
    throw new Error('You must be a DepartmentHead to access this functionality');
  }

  const { employeeId, department } = req.session.employee;
  Log.debug(`Current userId: ${employeeId}`);
  const reimbursements = await ReimburseService.getDepartmentHeadTodo(employeeId, department);

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
DepartmentHeadRouter.patch('/', async (req: express.Request<unknown, unknown, { requestId: string, role: any }, unknown, {}>, res) => {
  Log.info('Request hit DepartmentHeadRouter: patch/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }
  if(req.session.employee.role !== 'DepartmentHead') {
    throw new Error('You must be a DepartmentHead to access this functionality');
  }

  const { requestId, role } = req.body;
  Log.debug(`recived: ${requestId}, ${role}`);
  console.log(typeof (requestId));
  const result = await ReimburseService.getReimburseRequest(Number.parseInt(requestId, 10));
  if(result) {
    result.status = 'Pending Benifits Coordinators Approval';
    await ReimburseService.updateReimbursRequest(result);
  }

  res.sendStatus(202);
});

export default DepartmentHeadRouter;
