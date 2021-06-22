/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { MouseEventHandler, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { brotliCompress } from "zlib";
import { useAppSelector} from "../../../hooks";
import { sendBencoApproveRequest, sendDepartmentHeadApproveRequest, sendGetMyRequests, sendManagerApproveRequest } from "../../../remote/express_backend/ExpressBackendAPI";
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
  const ApproveHandler = async (requestId: number, level: Role) => {
    switch(level) {
      case Role.MANAGER:
        await sendManagerApproveRequest(requestId, level);
        break;
      case Role.DEPARTMENT_HEAD:
        await sendDepartmentHeadApproveRequest(requestId, level);
        break;
    }
    return;
  }
  
  switch(employee?.role) {
    case Role.EMPLOYEE:
      return (
          <EmployeeHomeComponent createRequestHandler={createRequestHandler}/>
      )
    case Role.MANAGER:
      return (
          <ManagerHomeComponent createRequestHandler={createRequestHandler} ApproveHandler={ApproveHandler}/>
      )
    case Role.DEPARTMENT_HEAD:
      return (
          <DepartHeadHomeComponent createRequestHandler={createRequestHandler}/>
      )
    case Role.BENIFITS_COORDINATOR: 
      return (
          <BencoHomeComponent />
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

