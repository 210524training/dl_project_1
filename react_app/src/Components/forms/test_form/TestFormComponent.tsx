import React, {ChangeEvent, FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ExpressClient from '../../../remote/express_backend/express.client';
import { useAppDispatch } from '../../../hooks';
import { loginAsync } from '../../../slices/EmployeeSlice';

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
    <div>
      <p>
        my test component.
      </p>
      <form onSubmit={run}>
      <label>Username</label>
      <input name="username" type="text"  id="usernameInput" placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
      <label>Password</label>
      <input name="password" type="password"  id="passwordInput" onChange={(event) => setPassword(event.target.value)}/>
      <input type="submit" value="Submit"/>
      </form>
      <Link to="/main">home page</Link>
    </div>
  )
};

export default TestFormComponent;