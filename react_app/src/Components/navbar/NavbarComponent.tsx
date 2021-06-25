/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { EmployeeState, selectEmployee } from '../../slices/EmployeeSlice';
import './NavbarCss.css';

type Props = {

}

const DisplayListComponent: React.FC<Props> = () => {

  const employee = useAppSelector<EmployeeState>(selectEmployee);

  if(employee) {
    // logged in
    return (
      <> 
        <div className='navbar-expand-lg navbar-light bg-light d-flex flex-row '>
          { employee && <div className="align">Greetings {employee.username}</div>}
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to='/main' className="nav-link">Home </Link>
              </li>
              <li className="nav-item">
                <Link to='/main/createRequest' className="nav-link">Create</Link>
              </li>
              <li className="nav-item">
                <Link to='/' className="nav-link">Loggout</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </>
    )
  } else {
    // not logged in
    return (
      <>
        <div className='navbar-expand-lg bg-light'>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <h1>Login</h1>
            </li>
          </ul>
        </div>
        </div>
      </>
    )
  }
  
};

export default DisplayListComponent;