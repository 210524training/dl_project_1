import React, { ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendGetMyRequests } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, selectEmployee } from "../../../slices/EmployeeSlice";
import DisplayListComponent from "../../display_fragments/displayList/DisplayListComponent";

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
        // add error handling
        setRequests(result); 
      })();
  }, []);
  
   
  return (
    <div>
      
        Employee home page component.
        { employee && <p>Greetings {employee.username}</p>}

        <p>Selected: {selected}</p>
        
        {requests 
          ? <DisplayListComponent requests={requests} setSelected={setSelected}/> 
          : <h1>No requests found.</h1>  
        }
        <button onClick={createRequestHandler}>Create Reimbursement Request</button>
        
    </div>
  )
};

export default EmployeeHomeComponent;