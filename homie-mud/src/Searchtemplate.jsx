import React from 'react'
import axios from 'axios'


function Searchtemplate({searchdata,following , setfollowing}) {

 
  
const currentuser = 101;
const followuser = Number(searchdata.user.id);


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
                                      
  
await  axios.put(`http://localhost:3000/userprofile/${followuser}`,updatefollowuserfollowerlist)                                    
  
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
                                      
await  axios.put(`http://localhost:3000/userprofile/${currentuser}`,updatecurrentuserfollowing)                                    
       
  
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
  
  }

  if (isfollowing) {
    setfollowing(prev =>
      prev.filter(id => id != followuser)
    )
  } else {
    setfollowing(prev => [
      ...prev,
      followuser
    ])
  }
}


    return (

 <div className='mx-4 my-4 '>
         <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={searchdata.user.profile}
            alt=""
            className="rounded-circle"
            width="35"      
            height="35"
          />

          <span className="ms-2 fw-semibold">{searchdata.user.username}</span>
        </div>

        <span className='text-info'onClick={()=>followbtn()}>
          {isfollowing ?"unfollow" :  "Follow"}</span>
         
      </div>
    </div>
    )
}

export default Searchtemplate