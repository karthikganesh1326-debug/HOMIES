import React from 'react'
import { useState,useEffect } from 'react'
import Suggestitemplate from './Suggestitemplate'


function Recommend({following , setfollowing}) {

  const[suggest , setsuggest] = useState([]);
  const[show , setshow] = useState(false);

   useEffect(()=>{
  
      fetch(`http://localhost:3000/suggestions`)
      .then((data)=>{
        return data.json()
      })
      .then((data)=>{
        setsuggest(data)
      })
      .catch((err)=>{
        console.log(err)
      })
  
    },[])


    function see(){
      setshow((prev)=>!prev)
    }

    const suggesttrim = show ? suggest.slice(0,3) : suggest.slice(0,1);

    const recomendations = suggesttrim.map((suggest)=>
      <Suggestitemplate
        key = {suggest.id}
        suggest = {suggest} 
        following={following}
        setfollowing={setfollowing}
        />
    )




  return (
    <>
    <div>
      <div className='d-flex justify-content-between align-items-center mx-4 my-2'>
        <span>You may know them</span>
        <span className='text-info' onClick={()=>see()}>
          {show ? "see less" : "see more"}</span>
      </div>
    </div>

   {recomendations}
    
    </>
  )
}

export default Recommend