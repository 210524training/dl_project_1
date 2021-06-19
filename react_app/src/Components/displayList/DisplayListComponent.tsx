import React, { useState } from "react";
import ReimbursmentRequest from "../../models/ReimbursementRequests";

type Props = {
  Request: ReimbursmentRequest;
}

const DisplayListComponent: React.FC<Props> = ({Request}) => {
  const testing = 'testText';
  console.log('In display comp', Request);
  return (
    <>
    
      <div>
        testing: {testing}
        requestId: {Request.requestId}
        employeeId: {Request.employeeId}
        eventType: {Request.eventType}
        eventLocation: {Request.eventLocation} 
        eventDate: {Request.eventDate}
        eventTime: {Request.eventTime}
        eventCost: {Request.eventCost}
        status: {Request.status}
        extraNotes: {Request.extraNotes}
     </div>
     </>
  )
};

export default DisplayListComponent;