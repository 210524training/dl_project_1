import { useState, useEffect, MouseEventHandler } from "react";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendGetManagerRequests, sendGetMyRequests } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, selectEmployee } from "../../../slices/EmployeeSlice";
import { Role } from "../../../types/MyTypes";
import DisplayListComponent from "../../display_fragments/displayList/DisplayListComponent";

type Props = {
  createRequestHandler: MouseEventHandler<HTMLButtonElement> | undefined,
  ApproveHandler: any
}

const ManagerHomeComponent: React.FC<Props> = ({createRequestHandler, ApproveHandler}) => {
  
  const [selected, setSelected] = useState<string>();
  const [requestSelected, setRequestSelected] = useState<string>();
  const [requests, setRequests] = useState<ReimbursmentRequest[]>();
  const [managerRequests, setManagerRequests] = useState<ReimbursmentRequest[]>();
  const employee = useAppSelector<EmployeeState>(selectEmployee);
  useEffect(() => {
      (async () => { 
        try {
          const result = await sendGetMyRequests();
          setRequests(result); 
        } catch(e) {
          console.log(e);
        }
        try {
          const result1 = await sendGetManagerRequests();
          setManagerRequests(result1);
        } catch(e) {
          console.log(e);
        }
        
      })();
  }, []);
  
   
  return (
    <div>
      
        Manager home page component.
        { employee && <p>Greetings {employee.username}</p>}
        
        <p>Selected: {selected}</p>
        
        {requests 
          ? <DisplayListComponent requests={requests} setSelected={setSelected}/> 
          : <h1>No requests found.</h1>  
        }
        <button onClick={createRequestHandler}>Create Reimbursement Request</button>
        <p> . . . . </p>
        <p>Selected: {requestSelected}</p>
        {managerRequests 
          ? <DisplayListComponent requests={managerRequests} setSelected={setRequestSelected}/> 
          : <h1>No requests found.</h1>  
        }
        {requestSelected
          ? <button onClick={() => {ApproveHandler(requestSelected, Role.MANAGER)}}>Approve Request</button> // onClick={ApproveHandler(requestSelected, Role.MANAGER)}
          : <></>
        }
        
    </div>
  )
};

export default ManagerHomeComponent;