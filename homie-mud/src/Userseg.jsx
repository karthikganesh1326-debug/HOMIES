import React, { useState,useEffect } from 'react'
import Post from './Post'
import Profiletemplate from './Profilesugtemplate'

function Userseg() {

const [profile , setprofile] = useState([])


  useEffect(()=>{

   

    fetch('http://localhost:3000/profile')
    .then((data)=>{
      return data.json()
    })
    .then((data)=>{
      setprofile(data)
    
    })
    .catch((err)=>{
      console.log(err)
    })
  
  },[])




const userprofile = profile.map((profile)=>(
  <Profiletemplate
  key = {profile.id}
  profile = {profile}
/>
))  



  return (
    <div>
      {userprofile}
    </div>
  )
}

export default Userseg