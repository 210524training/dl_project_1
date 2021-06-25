import { request } from "https";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";
import DisplayNotesComponent from "../display_notes/DisplayNotesComponent";
import  './DisplayList.css';
/* import '../display_notes/DisplayNotes.css'; */

type Props = {
  requests: ReimbursmentRequest[];
  setSelected: Dispatch<SetStateAction<string | undefined>>;
}

const DisplayListComponent: React.FC<Props> = ({requests, setSelected}) => {

  
  // const handleClick = (index)
  // console.log('In display comp', requests);
  return (
    <>

      {requests.map(element => (
        <div className='card listItem ' id={element.myRequestId.toString()} key={element.myRequestId.toString()}  onClick={(event) => setSelected(event.currentTarget.id)}>
          <div className='d-inline-flex flex-row'>
            <div className='Item '>
              <p className='ItemTitle'>requestId:</p> {`${element.myRequestId} `}
            </div>
            <div className='Item '>
              <p className='ItemTitle'>employeeId: </p> {`${element.employeeId} `}
            </div>
            <div className='Item '>
              <p className='ItemTitle'>eventType:</p> {`${element.eventType} `}
            </div>
            <div className='Item'>
              <p className='ItemTitle'>eventLocation:</p> {`${element.eventLocation} `} 
            </div>
            <div className='Item'>
              <p className='ItemTitle'>eventDate:</p> {`${element.eventDate} `}
            </div>
            <div className='Item'>
              <p className='ItemTitle'>eventTime:</p> {`${element.eventTime} `}
            </div>
            <div className='Item'>
              <p className='ItemTitle'>eventCost:</p> {`${element.eventCost} `}
            </div>
            <div className='Item'>
              <p className='ItemTitle'>status:</p> {`${element.status} `}
            </div>
            
          </div>
          <div className='d-inline-flex flex-row flex-wrap'>
              <DisplayNotesComponent notes={element.extraNotes}/>
          </div>
        </div> 
      ))} 
    
     </>
  )
};

export default DisplayListComponent;