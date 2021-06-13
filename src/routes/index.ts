import express, { Router } from 'express';
import Log from '../log';
import Employee from '../models/employee';
import EmployeeSecure from '../models/employee_secure';
import * as Database from '../services/database_service';
// import testRouter from './testRouter';

const baseRouter = Router();

async function getEmployee(employee: Employee) {
  const result = await Database.addEmployee(employee);
  console.log(result);
}

/* GET home page */
baseRouter.get('/', (req, res) => {
  Log.info('Request hit baseRouter: .get /');
  // getEmployee();

  res.sendFile('index.html', {
    root: 'src/public/views/',
  });
});

baseRouter.get('/isLogedIn', (req, res) => {
  Log.info('Request hit baseRouter: .get /isLogedIn');
  // getEmployee();

  if(req.session.isLoggedIn) {
    Log.info(`Responded with ${req.session.employee}`);
    res.json(req.session.employee);
  } else {
    Log.info('Responded with false');
    res.json(
      {
        result: 'false',
      },
    );
  }
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
  }

  /* res.sendFile('index.html', {
    root: 'src/public/views/',
  }); */
});

// baseRouter.use('/api/v1/test', testRouter);

export default baseRouter;
