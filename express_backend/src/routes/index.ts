import express, { Router } from 'express';
import Log from '../log';
import Employee from '../models/employee';
import EmployeeSecure from '../models/employee_secure';
import * as Database from '../services/database_service';
import EmployeeRouter from './employee_router';
import BencoRouter from './reimbursements/bencoRouter';
import DepartmentHeadRouter from './reimbursements/departmentHeadRouter';
import ManagerRouter from './reimbursements/managerRouter';
import ReimbursementRouter from './reimbursements/reimbursement_router';

const baseRouter = Router();

/* GET home page */
baseRouter.get('/', (req, res) => {
  Log.info('Request hit baseRouter: .get /');
  // getEmployee();

  res.sendFile('index.html', {
    root: 'src/public/views/',
  });
});

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  Log.info('Request hit baseRouter.post /login .');
  const { username, password } = req.body;

  Log.info('Got', username, ', ', password);

  Log.info(`Attempting to check login credintials for Empolyee: ${username}`);
  const employee: EmployeeSecure | undefined = await Database.checkLogin(username, password);

  if(employee) {
    req.session.isLoggedIn = true;
    req.session.employee = employee;
    Log.info(`Responded with ${req.session.employee}`);
    res.json(req.session.employee);
    // res.status(202).send();
  }
  res.status(404).send();
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.employee) {
    const { username } = req.session.employee;

    req.session.destroy(() => {
      Log.info(`${username} logged out`);
    });
  }
  // If they aren't logged in, we don't need to do anything

  res.status(202).send();
}

baseRouter.post('/logout', logout);
baseRouter.use('/api/v1/employees', EmployeeRouter);
baseRouter.use('/api/v1/reimbursements', ReimbursementRouter);
baseRouter.use('/api/v1/manager', ManagerRouter);
baseRouter.use('/api/v1/departmentHead', DepartmentHeadRouter);
baseRouter.use('/api/v1/benco', BencoRouter);

export default baseRouter;
