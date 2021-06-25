import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import ReimbursmentRequest, { RequestEvent } from "../../../models/ReimbursementRequests";
import { sendCreateRequest, sendGetMyRequests, sendUploadFile } from "../../../remote/express_backend/ExpressBackendAPI";
import { EmployeeState, loginAsync, selectEmployee } from "../../../slices/EmployeeSlice";
import { Role } from "../../../types/MyTypes";
type Props = {
  
}
const makeEventType = (input: string) => {
  switch(Number.parseInt(input, 10)) {
    case 0:
      return 'University Course';
    case 1:
      return 'Seminar';
    case 2:
      return 'Cerification Prep-Class';
    case 3:
      return 'Certification';
    case 4:
      return 'Technical Training';
    case 5:
      return 'Other';
  }
  return 'Other'
}

const CreateRequestFormComponent: React.FC<Props> = () => {
  const history = useHistory();
  const employee = useAppSelector<EmployeeState>(selectEmployee);
  const [eventType, setEventType] = useState<string>('University Course');
  const [eventLocation, setEventLocation] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventTime, setEventTime] = useState<string>('');
  const [eventCost, setEventCost] = useState<string>('');
  const [eventNote, setEventNote] = useState<string>('');

  const [file, setFile] = useState<any>();
  useEffect(() => {
    (() => { 
      console.log(employee?.firstName);
      if(!employee) {
        console.log('Not Logged In!');
        history.push('/');
      }
    })();
}, [employee, history]);
 

  const testSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('running send file');
    await sendUploadFile(file);
  }

  const run = (event:  React.ChangeEvent<HTMLInputElement>) => {
    console.log('file changed');
    setFile(event.target.files);
  }


  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(employee?.employeeId) {
      const type = makeEventType(eventType);
      const request: ReimbursmentRequest = new ReimbursmentRequest(4258, employee?.employeeId, type, eventLocation, eventDate, eventTime, Number.parseInt(eventCost), 'Pending Managers Approval', [eventNote]);
      await sendCreateRequest(request);
    } else {
      window.prompt('Must be logged in');
    }
    
    console.log('submited form.');
    history.push('/main');
  } 
  return (
    <>

      <Helmet>
        <title>Create Request</title>
      </Helmet>

      <div>
        <p>
          Create a reimbursement request.
        </p>
        <form onSubmit={submit}>
        <label>Request ID:   </label>
        <label>Employee ID: {employee?.employeeId} </label>
        <label>Event Type: </label>
        <select id="requestIdInput" onChange={(event) => setEventType(event.target.value)} >
          <option value="none" selected disabled hidden>Choose an option</option>
          <option value='0'>University Course</option>
          <option value='1'>Seminar</option>
          <option value='2'>Cerification Prep-Class</option>
          <option value='3'>Certification</option>
          <option value='4'>Technical Training</option>
          <option value='5'>Other</option>
        </select>
        <label>Event Location: </label>
        <input type='text' onChange={(event) => setEventLocation(event.target.value)}/>
        <label>Event Date</label>
        <input type='date' onChange={(event) => setEventDate(event.target.value)}/>
        <label>Event Time: </label>
        <input type='time' onChange={(event) => setEventTime(event.target.value)}/>
        <label>Event Cost: </label>
        <input type='number' onChange={(event) => setEventCost(event.target.value)}/>
        <label>Notes: </label>
        <input type='text' onChange={(event) => setEventNote(event.target.value)}/>




        <input type="submit" value="Submit"/>
        </form>
        <br/>
        <br/>
        <br/>

        <form onSubmit={testSubmit}>
          <input type="file" onChange={run}/>
          <button type='submit' value='Submit'>submit</button>
        </form>
      </div>
    </>
  )
};

export default CreateRequestFormComponent;