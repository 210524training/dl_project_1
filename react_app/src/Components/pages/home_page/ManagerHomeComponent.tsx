import { string } from "prop-types";
import { useState, useEffect, MouseEventHandler } from "react";
import { Helmet } from "react-helmet";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendGetBencoRequests, sendGetManagerRequests, sendGetMyRequests, sendManagerApproveRequest, sendRejectRequest, sendUpdateRequest } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, selectEmployee } from "../../../slices/EmployeeSlice";
import { Role } from "../../../types/MyTypes";
import DisplayListComponent from "../../display_fragments/displayList/DisplayListComponent";

type Props = {
  createRequestHandler: MouseEventHandler<HTMLButtonElement> | undefined,
}

const ManagerHomeComponent: React.FC<Props> = ({createRequestHandler}) => {
  
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

  const RejectHandler = async (requestId: string) => {
    await sendRejectRequest(Number.parseInt(requestId));
    (async () => { 
      try {
        const result1 = await sendGetManagerRequests();
        setManagerRequests(result1); 
      } catch (error) {
        console.log(error);
      }
      
    })();
    return;
  }
  
  const ApproveHandler = async (requestId: string, level: Role) => {
    await sendManagerApproveRequest(Number.parseInt(requestId), level);
    (async () => { 
      try {
        const result1 = await sendGetManagerRequests();
        setManagerRequests(result1); 
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
        const result1 = await sendGetManagerRequests();
        setManagerRequests(result1); 
      } catch (error) {
        console.log(error);
      }
      
    })();
  }
   
  return (
    <>

      <Helmet>
        <title>Manager Home</title>
      </Helmet>

      <div className='container d-flex flex-column bg-light justify-content-center'>

        <h5>My reimbursement requests</h5>
        
        <p>Selected: {selected}</p>
        
        {requests 
          ? <DisplayListComponent requests={requests} setSelected={setSelected}/> 
          : <h1>No requests found.</h1>  
        }
        <button onClick={createRequestHandler}>Create Reimbursement Request</button>
        <p> . . . . </p>
        <h5>Employee requests</h5>
        <p>Selected: {requestSelected}</p>
        {managerRequests 
          ? <DisplayListComponent requests={managerRequests} setSelected={setRequestSelected}/> 
          : <h1>No requests found.</h1>  
        }
        {requestSelected
          ? <button onClick={() => {ApproveHandler(requestSelected, Role.MANAGER)}}>Approve Request</button>
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

export default ManagerHomeComponent;