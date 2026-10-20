import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Suggestitemplate({suggest, following , setfollowing}) {



const navigate = useNavigate()

const currentuser = 101;
const followuser = Number(suggest.id);


const isfollowing =
       following.includes(followuser)



async function followbtn(){
 


  const getcurrentuser = await 
                          axios.get(`http://localhost:3000/userprofile/${currentuser}`);

  
  const getfollowuser = await 
                          axios.get(`http://localhost:3000/userprofile/${followuser}`);


  const isfollowing = 
                      getcurrentuser.data.user.following.includes(followuser)

  if(isfollowing){

    const updatecurrentuserfollowing = 
                                      {
                                        ...getcurrentuser.data,
                                        user:{
                                              ...getcurrentuser.data.user,
                                              following: 
                                                getcurrentuser.data.user.following.filter((id)=>id!=followuser)
                                              
                                        }
                                      }   
                                      
await  axios.put(`http://localhost:3000/userprofile/${currentuser}`,updatecurrentuserfollowing)                                    
       
  
   const updatefollowuserfollowerlist = 
                                      {
                                        ...getfollowuser.data,
                                        user:{
                                              ...getfollowuser.data.user,
                                              followers: 
                                                getfollowuser.data.user.followers.filter((id)=>id!=currentuser)
                                              
                                        }
                                      }
                                      
  
 await axios.put(`http://localhost:3000/userprofile/${followuser}`,updatefollowuserfollowerlist)  
  
  setfollowing(prev =>
      prev.filter(id => id != followuser)
    )
  
  }

  
  else{

    const updatecurrentuserfollowing = 
                                      {
                                        ...getcurrentuser.data,
                                        user:{
                                              ...getcurrentuser.data.user,
                                              following: [
                                                ...getcurrentuser.data.user.following,followuser
                                              ]
                                        }
                                      }   
                                      
 await axios.put(`http://localhost:3000/userprofile/${currentuser}`,updatecurrentuserfollowing)                                    
       
  
   const updatefollowuserfollowerlist = 
                                      {
                                        ...getfollowuser.data,
                                        user:{
                                              ...getfollowuser.data.user,
                                              followers: [
                                                ...getfollowuser.data.user.followers,currentuser
                                              ]
                                        }
                                      }
                                      
  
await  axios.put(`http://localhost:3000/userprofile/${followuser}`,updatefollowuserfollowerlist)                                    
  
setfollowing(prev => [
      ...prev,
      followuser
    ])

  }

}

function userdetail(id){
  navigate(`/userprofile/${id}`)
}

  return (
     <div className='mx-4 my-4 '>
         <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center" onClick={()=>userdetail(suggest.id)}>
          <img
            src={suggest.profile}
            alt=""
            className="rounded-circle"
            width="35"      
            height="35"
          />

          <span className="ms-2 fw-semibold">{suggest.username}</span>
        </div>

        <span className='text-info'onClick={()=>followbtn()}
           style={{ cursor: "pointer" }}>
          {isfollowing ?"unfollow" :  "Follow"}</span>
         
      </div>
    </div>
  )
}

export default Suggestitemplate