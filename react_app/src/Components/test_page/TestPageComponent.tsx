/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAppSelector, UseLoadMyRequests } from "../../hooks";
import ReimbursmentRequest from "../../models/ReimbursementRequests";
import { selectEmployee, EmployeeState } from '../../slices/EmployeeSlice';
import { retriveMyRequests, MyRequestsState, getMyRequestsAsync } from '../../slices/ReimbursementRequestsSlice';

import { useAppDispatch } from '../../hooks';
import DisplayListComponent from "../displayList/DisplayListComponent";
import { element } from "prop-types";
import { sendGetMyRequests } from "../../remote/express_backend/ExpressBackendAPI";
// import {sendGetMyRequests} from '../../remote/express_backend/ExpressBackendAPI';

type Props = {
  amount?: number;
}

const TestPageComponent: React.FC<Props> = ({ amount = 1}) => {
  
  const dispatch = useAppDispatch();
  const [requests, setRequests] = useState<ReimbursmentRequest[]>();
  
  useEffect(() => {
      // dispatch(getMyRequestsAsync({}));
      const fetchData = async () => {
        const result = await sendGetMyRequests();
   
        setRequests(result);
      };
   
      fetchData();

  }, [dispatch]);


  const employee = useAppSelector<EmployeeState>(selectEmployee);
  // const temp = useLoadMyRequests();
  // const test = useAppSelector<MyRequestsState>(retriveMyRequests);
  // const test = useLoadMyRequests();
  
  if(!requests) {
    return (
      <>
      </>
    )
  }
  /* const getRequests = async () => {
    const requests: unknown = await sendGetMyRequests();
    return requests;
  } */
  
   
  return (
    <div>
      <div>
        my test page component.
        { employee && <p>Greetings {employee.username}</p>}
        
        <DisplayListComponent Request={requests[0]}/>
        
        
      </div>
      {/* {test?.forEach((element: ReimbursmentRequest)=>{
          return (
          <DisplayListComponent Request={element}/>
          ); 
        })} */}
      </div>
  )
};

export default TestPageComponent;