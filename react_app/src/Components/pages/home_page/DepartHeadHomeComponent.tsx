import { useState, useEffect, MouseEventHandler } from "react";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendBencoApproveRequest, sendGetDepartmentHeadRequests, sendGetMyRequests } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, selectEmployee } from "../../../slices/EmployeeSlice";
import { Role } from "../../../types/MyTypes";
import DisplayListComponent from "../../display_fragments/displayList/DisplayListComponent";

type Props = {
  createRequestHandler: MouseEventHandler<HTMLButtonElement> | undefined,
}

const DepartHeadHomeComponent: React.FC<Props> = ({createRequestHandler}) => {
  
  //  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<string>();
  const [requests, setRequests] = useState<ReimbursmentRequest[]>();
  const [requestSelected, setRequestSelected] = useState<string>();
  const [departmentHeadRequests, setDepartmentHeadRequests] = useState<ReimbursmentRequest[]>();
  const employee = useAppSelector<EmployeeState>(selectEmployee);
  useEffect(() => {
      (async () => { 
        try {
          const result = await sendGetMyRequests();
          setRequests(result); 
        } catch(error) {
          console.log(error);
        }
        try {
          const result1 = await sendGetDepartmentHeadRequests();
          setDepartmentHeadRequests(result1); 
        } catch (error) {
          console.log(error);
        }
        
      })();
  }, []);

  const ApproveHandler = async (requestId: string, level: Role) => {
    await sendBencoApproveRequest(Number.parseInt(requestId), level);
    
    
    return;
  } 
   
  return (
    <div>
      
        DepartmentHead home page component.
        { employee && <p>Greetings {employee.username}</p>}
        
        {requests 
          ? <DisplayListComponent requests={requests} setSelected={setSelected}/> 
          : <h1>No requests found.</h1>  
        }
        <button onClick={createRequestHandler}>Create Reimbursement Request</button>
        <p> . . . . </p>
        <p>Selected: {requestSelected}</p>
        {departmentHeadRequests 
          ? <DisplayListComponent requests={departmentHeadRequests} setSelected={setRequestSelected}/> 
          : <h1>No requests found.</h1>  
        }
        {requestSelected
          ? <button onClick={() => {ApproveHandler(requestSelected, Role.BENIFITS_COORDINATOR)}}>Approve Request</button>
          : <></>
        }

    </div>
  )
};

export default DepartHeadHomeComponent;