import express, { Router } from 'express';
import Log from '../../log';
import * as ReimburseService from '../../services/reimburse_request_service';

const BencoRouter = Router();

/**
 * Handles requests to get all requests that need benco approval.
 */
BencoRouter.get('/', async (req, res) => {
  Log.info('Request hit BencoRouter: get/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }
  if(req.session.employee.role !== 'Benifits Coordinator') {
    throw new Error('You must be a Benco to access this functionality');
  }

  const { employeeId } = req.session.employee;
  Log.debug(`Current userId: ${employeeId}`);
  const reimbursements = await ReimburseService.getBencoTodo(employeeId);

  if(reimbursements) {
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
BencoRouter.patch('/', async (req: express.Request<unknown, unknown, { requestId: string, role: any }, unknown, {}>, res) => {
  Log.info('Request hit BencoRouter: patch/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }
  if(req.session.employee.role !== 'Benifits Coordinator') {
    throw new Error('You must be a Benco to access this functionality');
  }

  const { requestId, role } = req.body;
  Log.debug(`recived: ${requestId}, ${role}`);
  const result = await ReimburseService.getReimburseRequest(Number.parseInt(requestId, 10));
  if(result && result.status === 'Pending Benifits Coordinators Approval') {
    result.status = 'Approved - Pending Grades';
    await ReimburseService.updateReimbursRequest(result);
  } else if(result?.status === 'Pending - Grades Approval') {
    result.status = 'Awarded';
    await ReimburseService.updateReimbursRequest(result);
  }

  res.sendStatus(202);
});

export default BencoRouter;
