import express, { Router } from 'express';
import Log from '../../log';
import ReimbursmentRequest from '../../models/reimburse_request';
import * as ReimburseService from '../../services/reimburse_request_service';
import ManagerRouter from './managerRouter';

const ReimbursementRouter = Router();

/**
 * Handles requests to get an Employees reimbursmentRequests.
 */
ReimbursementRouter.get('/', async (req, res) => {
  Log.info('Request hit ReimbursementRouter: get/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const { employeeId } = req.session.employee;
  Log.debug(`Current userId: ${employeeId}`);
  const reimbursements = await ReimburseService.getMyRequests(employeeId);

  if(reimbursements) {
    Log.info('Sent response to client.');
    res.json(reimbursements);
  } else {
    Log.info('Sent error status to client.');
    res.sendStatus(404);
  }
});

/* ReimbursementRouter.get('/customer', async (req, res) => {
  Log.info('Request hit EmployeeRouter: get/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const { employeeId } = req.session.employee;
  Log.debug(`Current userId: ${employeeId}`);
  const reimbursements = await ReimburseService.getMyRequests(employeeId);

  if(reimbursements) {
    Log.info('Sent response to client.');
    res.json(reimbursements);
  } else {
    Log.info('Sent error status to client.');
    res.sendStatus(404);
  }
}); */

/**
 * Handles requests to get Employee by Id.
 */
ReimbursementRouter.get('/:id', async (req, res) => {
  Log.info('Request hit ReimbursmentRouter: /:id ');
  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const reimburseId: number = Number.parseInt(req.params.id, 10);
  Log.debug(`Recived ${reimburseId}`);
  const reimbursement = await ReimburseService.getReimburseRequest(reimburseId);

  if(reimbursement) {
    res.json(reimbursement);
  } else {
    res.sendStatus(404);
  }
});

/**
 * Handles requests to add a ReimbursmentRequest.
 */
ReimbursementRouter.post('/', async (req: express.Request<unknown, unknown, { request: ReimbursmentRequest }, unknown, {}>, res) => {
  Log.info('Request hit EmployeeRouter: post/ ');
  const { request } = req.body;
  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  // eslint-disable-next-line max-len
  const result: boolean = await ReimburseService.addReimbursRequest(request);

  if(result) {
    res.sendStatus(202);
  } else {
    res.sendStatus(500);
  }
});

/**
 * Handles requests to update a ReimbursmentRequest.
 */
ReimbursementRouter.patch('/', async (req: express.Request<unknown, unknown, ReimbursmentRequest, unknown, {}>, res) => {
  Log.info('Request hit EmployeeRouter: patch/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  // eslint-disable-next-line max-len
  const result: boolean = await ReimburseService.updateReimbursRequest(req.body as ReimbursmentRequest);

  if(result) {
    res.sendStatus(202);
  } else {
    res.sendStatus(500);
  }
});

export default ReimbursementRouter;
