import React, { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendGetMyRequests, sendUpdateRequest } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, selectEmployee } from "../../../slices/EmployeeSlice";
import DisplayListComponent from "../../display_fragments/displayList/DisplayListComponent";
import {Helmet} from "react-helmet";

type Props = {
  createRequestHandler: MouseEventHandler<HTMLButtonElement> | undefined
}

const EmployeeHomeComponent: React.FC<Props> = ({createRequestHandler}) => {
  
  //  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>();
  const [requests, setRequests] = useState<ReimbursmentRequest[]>();
  const employee = useAppSelector<EmployeeState>(selectEmployee);
  useEffect(() => {
      (async () => { 
        const result = await sendGetMyRequests();
        setRequests(result); 
      })();
  }, []);
  
  const RequestInformation = async (requestId: string,) => {
    const note = window.prompt('What would you like to request?', 'canceled');
    if (note) {
      await sendUpdateRequest(requestId, note);
    }
    (async () => { 
      try {
        const result = await sendGetMyRequests();
        setRequests(result); 
      } catch (error) {
        console.log(error);
      }
      
    })();
  }
   
  return (
    <>

      <Helmet>
        <title>Employee Home</title>
      </Helmet>

      <div className='container d-flex flex-column bg-light justify-content-center'>
        <h5>My Reimbursment Requests</h5>

        <br/>

        <p>Selected: {selected}</p>

        <div className='Item'>
          <p className='ItemTitle'>Balance: </p> {`${employee?.balance} `}
        </div>
        
        {requests 
          ? <DisplayListComponent requests={requests} setSelected={setSelected}/> 
          : <h1>No requests found.</h1>  
        }
        <button onClick={createRequestHandler}>Create Reimbursement Request</button>
        {selected
        ? <button onClick={() => {RequestInformation(selected)}}>Answer Information Request</button>
        : <></>
        }
      </div>
    </>
  )
};

export default EmployeeHomeComponent;