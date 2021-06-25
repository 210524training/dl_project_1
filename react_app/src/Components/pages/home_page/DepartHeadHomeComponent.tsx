import { useState, useEffect, MouseEventHandler } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../hooks";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import { sendBencoApproveRequest, sendDepartmentHeadApproveRequest, sendGetDepartmentHeadRequests, sendGetMyRequests, sendRejectRequest, sendUpdateRequest } from "../../../remote/express_backend/ExpressBackendAPI";
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
  const history = useHistory();
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

  useEffect(() => {
    (() => { 
      console.log(employee?.firstName);
      if(!employee) {
        console.log('Not Logged In!');
        history.push('/');
      }
    })();
}, [employee, history]);

  const RejectHandler = async (requestId: string) => {
    await sendRejectRequest(Number.parseInt(requestId));
    (async () => { 
      try {
        const result1 = await sendGetDepartmentHeadRequests();
        setDepartmentHeadRequests(result1); 
      } catch (error) {
        console.log(error);
      }
      
    })();
    return;
  }

  const ApproveHandler = async (requestId: string, level: Role) => {
    await sendDepartmentHeadApproveRequest(Number.parseInt(requestId), level);
    (async () => { 
      try {
        const result1 = await sendGetDepartmentHeadRequests();
        setDepartmentHeadRequests(result1); 
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
        const result1 = await sendGetDepartmentHeadRequests();
        setDepartmentHeadRequests(result1); 
      } catch (error) {
        console.log(error);
      }
      
    })();
  }

  return (
    <>

      <Helmet>
        <title>DepartmentHead Home</title>
      </Helmet>

      <div className='container d-flex flex-column bg-light justify-content-center'>
        
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

export default DepartHeadHomeComponent;