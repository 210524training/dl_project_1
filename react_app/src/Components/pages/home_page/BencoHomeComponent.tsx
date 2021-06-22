import { useState, useEffect, MouseEventHandler } from "react";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendBencoApproveRequest, sendGetBencoRequests, sendGetMyRequests } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, selectEmployee } from "../../../slices/EmployeeSlice";
import { Role } from "../../../types/MyTypes";
import DisplayListComponent from "../../display_fragments/displayList/DisplayListComponent";

type Props = {
  
}

const BencoHomeComponent: React.FC<Props> = () => {
  
  //  const dispatch = useAppDispatch();
  const [requestSelected, setRequestSelected] = useState<string>();
  const [bencoRequests, setBencoRequests] = useState<ReimbursmentRequest[]>();
  const employee = useAppSelector<EmployeeState>(selectEmployee);
  useEffect(() => {
      (async () => { 
        try {
          const result1 = await sendGetBencoRequests();
          setBencoRequests(result1); 
        } catch (error) {
          console.log(error);
        }
        
      })();
  }, []);
  
  const ApproveHandler = async (requestId: string, level: Role) => {
    await sendBencoApproveRequest(Number.parseInt(requestId, 10), level);
    
    (async () => { 
      try {
        const result1 = await sendGetBencoRequests();
        setBencoRequests(result1); 
      } catch (error) {
        console.log(error);
      }
      
    })();
    return;
  }
  return (
    <div>
      
        Benco home page component.
        { employee && <p>Greetings {employee.username}</p>}
        
        {bencoRequests 
          ? <DisplayListComponent requests={bencoRequests} setSelected={setRequestSelected}/> 
          : <h1>No requests found.</h1>  
        }
        {requestSelected 
          ? <button onClick={() => {ApproveHandler(requestSelected, Role.BENIFITS_COORDINATOR)}}>Approve Request</button>
          : <></>
        }
    </div>
  )
};

export default BencoHomeComponent;