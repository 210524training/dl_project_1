import express, { Router } from 'express';
import Log from '../log';
import ReimbursmentRequest from '../models/reimburse_request';
import * as ReimburseService from '../services/reimburse_request_service';

const ReimbursmentRouter = Router();

/**
 * Handles retriving base ReimbursmentRouter requests.
 */
ReimbursmentRouter.get('/', async (req, res) => {
  Log.info('Request hit EmployeeRouter: get/ ');

  /* if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  Log.info(`${req.session.employee.username} is logged in`);
  res.json([req.session.employee]); */
});

/**
 * Handles requests to get Employee by Id.
 */
ReimbursmentRouter.get('/:id', async (req, res) => {
  Log.info('Request hit ReimbursmentRouter: /:id ');
  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const reimburseId: number = Number.parseInt(req.params.id, 10);
  Log.debug(`Recived ${reimburseId}`);
  const reimbursement = await ReimburseService.getReimburseRequest(reimburseId);

  if(reimbursement) {
    res.json([reimbursement]);
  }
  res.sendStatus(404);
});

/**
 * Handles requests to get an Employees reimbursmentRequests.
 */
ReimbursmentRouter.get('/myReimbursmentRequests', async (req, res) => {
  Log.info('Request hit ReimbursmentRouter: /myReimbursmentRequests ');
  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  const { employeeId } = req.session.employee;
  Log.debug(`Recived ${employeeId}`);
  const reimbursements = await ReimburseService.getReimburseRequest(employeeId);

  if(reimbursements) {
    res.json([reimbursements]);
  }
  res.sendStatus(404);
});

/**
 * Handles requests to add a ReimbursmentRequest.
 */
ReimbursmentRouter.post('/', async (req: express.Request<unknown, unknown, ReimbursmentRequest, unknown, {}>, res) => {
  Log.info('Request hit EmployeeRouter: post/ ');

  if(!req.session.isLoggedIn || !req.session.employee) {
    throw new Error('You must be logged in to access this functionality');
  }

  // eslint-disable-next-line max-len
  const result: boolean = await ReimburseService.addReimbursRequest(req.body as ReimbursmentRequest);

  if(result) {
    res.sendStatus(202);
  } else {
    res.sendStatus(500);
  }
});

/**
 * Handles requests to update a ReimbursmentRequest.
 */
ReimbursmentRouter.patch('/', async (req: express.Request<unknown, unknown, ReimbursmentRequest, unknown, {}>, res) => {
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

export default ReimbursmentRouter;
