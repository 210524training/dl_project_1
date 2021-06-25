/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { brotliCompress } from "zlib";
import { useAppSelector} from "../../../hooks";
import { sendBencoApproveRequest, sendDepartmentHeadApproveRequest, sendGetMyRequests, sendManagerApproveRequest, sendRejectRequest } from "../../../remote/express_backend/ExpressBackendAPI";
import { selectEmployee, EmployeeState } from '../../../slices/EmployeeSlice';
import { Role } from "../../../types/MyTypes";
import BencoHomeComponent from "./BencoHomeComponent";
import DepartHeadHomeComponent from "./DepartHeadHomeComponent";
import EmployeeHomeComponent from "./EmployeeHomeComponent";
import ManagerHomeComponent from "./ManagerHomeComponent";

// import {sendGetMyRequests} from '../../remote/express_backend/ExpressBackendAPI';

type Props = {
  amount?: number;
}

const TestPageComponent: React.FC<Props> = ({ amount = 1}) => {

  const employee = useAppSelector<EmployeeState>(selectEmployee);
  const [reload, setReload] = useState<number>();
  const history = useHistory();
  useEffect(() => {
      (() => { 
        console.log(employee?.firstName);
        if(!employee) {
          console.log('Not Logged In!');
          history.push('/');
        }
      })();
  }, [employee, history]);

  const createRequestHandler = (): MouseEventHandler<HTMLButtonElement> | undefined => {
    history.push('/main/createRequest');
    return;
  }
  

  
  
  switch(employee?.role) {
    case Role.EMPLOYEE:
      return (
        <div className='container'>
          <EmployeeHomeComponent createRequestHandler={createRequestHandler}/>
        </div>
      )
    case Role.MANAGER:
      return (
        <div className='container'>
          <ManagerHomeComponent createRequestHandler={createRequestHandler}/>
        </div>
      )
    case Role.DEPARTMENT_HEAD:
      return (
        <div className='container'>
          <DepartHeadHomeComponent createRequestHandler={createRequestHandler}/>
        </div>
      )
    case Role.BENIFITS_COORDINATOR: 
      return (
        <div className='container'>
           <BencoHomeComponent/>
        </div>
      )
    default:
      return (
        <>
          <p>Employee Role Not Found.</p>
        </>
      )

  }
};

export default TestPageComponent;

