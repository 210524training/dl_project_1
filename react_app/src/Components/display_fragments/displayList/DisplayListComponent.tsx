import { request } from "https";
import React, { Dispatch, SetStateAction, useState } from "react";
import ReimbursmentRequest from "../../../models/ReimbursementRequests";

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
        <div id={element.myRequestId.toString()} key={element.myRequestId.toString()}  onClick={(event) => setSelected(event.currentTarget.id)}>
          requestId: {`${element.myRequestId} `}
          employeeId: {`${element.employeeId} `}
          eventType: {`${element.eventType} `}
          eventLocation: {`${element.eventLocation} `} 
          eventDate: {`${element.eventDate} `}
          eventTime: {`${element.eventTime} `}
          eventCost: {`${element.eventCost} `}
          status: {`${element.status} `}
          extraNotes: {`${element.extraNotes} `}
        </div>
      ))}
    
     </>
  )
};

export default DisplayListComponent;