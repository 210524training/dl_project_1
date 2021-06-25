import React, {ChangeEvent, FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ExpressClient from '../../../remote/express_backend/express.client';
import { useAppDispatch } from '../../../hooks';
import { loginAsync } from '../../../slices/EmployeeSlice';
import './LoginCss.css';

type Props = {
  amount?: number;
}

const TestFormComponent: React.FC<Props> = ({ amount = 1}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>(' ');
  const [password, setPassword] = useState<string>(' ');
  
  const run = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submited form.');

    await dispatch(loginAsync({username, password}));
    history.push('/main');
  } 
  return (
    <div className='container d-flex flex-column bg-light vert-align temp justify-content-center'>
      <div className=''>
        <h4 className='d-flex flex-row justify-content-center padding '>
          Welcome to the Employee Reimbursements Portal.
        </h4>
        <p className='d-flex flex-row justify-content-center padding '>
          Please login.
        </p>
        <form onSubmit={run} className='d-flex flex-row justify-content-center'>
        <label className='padding'>Username</label>
        <input className='padding' name="username" type="text"  id="usernameInput" placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
        <label className='padding'>Password</label>
        <input className='padding' name="password" type="password"  id="passwordInput" onChange={(event) => setPassword(event.target.value)}/>
        <input className='padding' type="submit" value="Submit"/>
        </form>
      </div>
     
    </div> 
  )
};

export default TestFormComponent;