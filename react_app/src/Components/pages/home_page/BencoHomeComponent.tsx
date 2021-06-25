import { useState, useEffect, MouseEventHandler } from "react";
import { Helmet } from "react-helmet";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendBencoApproveRequest, sendGetBencoRequests, sendGetMyRequests, sendRejectRequest, sendUpdateRequest } from "../../../remote/express_backend/ExpressBackendAPI";
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

  const RejectHandler = async (requestId: string) => {
    await sendRejectRequest(Number.parseInt(requestId));
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

  const RequestInformation = async (requestId: string,) => {
    const note = window.prompt('What would you like to request?', 'canceled');
    if (note) {
      await sendUpdateRequest(requestId, note);
    }
    (async () => { 
      try {
        const result1 = await sendGetBencoRequests();
        setBencoRequests(result1); 
      } catch (error) {
        console.log(error);
      }
      
    })();
  }
  
  return (
    <>

      <Helmet>
        <title>Benco Home</title>
      </Helmet>

      <div className='container d-flex flex-column bg-light justify-content-center'>
        
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
        {requestSelected
          ? <button onClick={() => {RejectHandler(requestSelected)}}>Reject Request</button>
          : <></>
        }
        {requestSelected
        ? <button onClick={() => {RequestInformation(requestSelected)}}>Request Information</button>
        : <></>
        }
      </div>
    </>
  )
};

export default BencoHomeComponent;