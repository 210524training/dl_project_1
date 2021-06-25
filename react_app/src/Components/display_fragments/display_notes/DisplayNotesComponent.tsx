import React from "react";
import  './DisplayNotes.css'

type Props = {
  notes: string[]; 
}

const DisplayNotesComponent: React.FC<Props> = ({notes}) => {

  
  // const handleClick = (index)
  // console.log('In display comp', requests);
  return (
    <>

      {notes.map(element => (
        <div className='card  tempNote' key={Math.random() * 100}  >
            {element}
        </div> 
      ))}
    
     </>
  )
};

export default DisplayNotesComponent;