import React, { useState,useEffect } from 'react'
import Reelstemplate from './Reelstemplate'

function Reels() {

const [reels , setreels] = useState([])


  useEffect(()=>{
  
      fetch('http://localhost:3000/reels')
      .then((data)=>{
        return data.json()
      })
      .then((data)=>{
        setreels(data)
      })
      .catch((err)=>{
        console.log(err)
      })
  
    },[])


    const reelsdata =  reels.map((reels)=>(
        <Reelstemplate
        
            key={reels.id}
            reeldata = {reels}
        
        />
    ))


  return (
    <div className="reels-container">
        {reelsdata}
    </div>
  )
}

export default Reels