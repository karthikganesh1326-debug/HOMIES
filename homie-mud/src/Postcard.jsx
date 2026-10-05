import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"


function Postcard({ post,deletepost ,following , setfollowing}) {


  const [likebtn , setlikebtn] = useState(post.liked)
   const [like , setlike] = useState(post)

    const [threedot , setthreedot] = useState(false)
    

      const [bookmark , setbookmark] = useState(false)

let threedotref = useRef(null)

 let navigate = useNavigate()

useEffect(
  ()=>{
      function handle(event){
          if(threedotref.current && !threedotref.current.contains(event.target)){
            setthreedot(false)
          }

      }
 

  document.addEventListener("click" , handle)

  return( ()=>document.removeEventListener("click" , handle) )
  
},[])



function likebutton(){
  
setlikebtn((prev)=>!prev)

const likedata = ({
 
    ...like,
    likes : likebtn? like.likes-1 : like.likes+1,
    liked : !likebtn
}
)

setlike(likedata)

axios.put(`http://localhost:3000/posts/${post.id}`,likedata)


}

const currentuser = 101;
const followuser = Number(post.user.id);


const isfollowing =
       following.includes(followuser)


function threedotsbtn(){
  setthreedot((prev)=>!prev)
}

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

function remove(id){
  console.log(id)
  deletepost(id)
}

function userdetails(id){
  navigate(`/userprofile/${post.user.id}`)
}

function bookbtn(){
  setbookmark((prev)=>!prev)
}

  return (
    
    <div className="card border-1 rounded-2 mx-auto mb-4  " style={{ maxWidth: "470px"  }}>
      {/* Header */}
      <div  className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <div  onClick={()=>userdetails(post.user.id)} className="d-flex align-items-center">
          <img
            src={post.user.profile}
            alt=""
            className="rounded-circle"
            width="35"
            height="35"
          />

          <span className="ms-2 fw-semibold">{post.user.username}</span>
        </div>

       <div className="position-relative" ref={threedotref}>

    {/* Three dots */}
    <i
      className="bi bi-three-dots fs-5"
      onClick={threedotsbtn}
      style={{ cursor: "pointer" }}
    ></i>


    {/* Menu */}
    {threedot && (
      <div
        className="position-absolute bg-white border rounded-3 shadow"
        style={{
          top: "25px",
          right: "0",
          width: "170px",
          zIndex: 1000
        }}
      >

        {/* Follow */}
        <div
          className="p-3"
          onClick={followbtn}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-person-plus me-2"></i>

          {isfollowing ? "Unfollow" : "Follow"}
        </div>


        {/* Not interested */}
        <div
          className="p-3"
           onClick={()=>remove(post.id)}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-eye-slash me-2"></i>

          Not interested
        </div>

      </div>
    )}

  </div>


      </div>

      {/* Post Image */}
      <img
        src={post.image}
        alt=""
        className="card-img-top"
        style={{ height: "450px", objectFit: "cover" }}
      />

      {/* Action Icons */}
      <div className="card-body">

        <div className="d-flex justify-content-between mb-2">

          <div>
            <i   className={likebtn ? "bi bi-heart-fill text-danger fs-4 me-3" :"bi bi-heart fs-4 me-3" } 
                  
                  onClick={likebutton}>

            </i>
            <i className="bi bi-chat fs-4 me-3"  onClick={()=>navigate('/messages')}></i>
            <i   onClick={()=>navigate('/messages')} className="bi bi-send fs-4"></i>
          </div>

          <i className={bookmark? "bi bi-bookmark-fill  text-info fs-4" :"bi bi-bookmark fs-4"}
          onClick={bookbtn}
          ></i>

        </div>

        {/* Likes */}
        <p className="fw-semibold mb-1">{like.likes} likes</p>

        {/* Caption */}
        <p className="mb-1">
          <span className="fw-semibold me-2">
            {post.user.username}
          </span>

          {post.caption}
        </p>

        {/* Comments */}
        <small className="text-secondary"  onClick={()=>navigate('/messages')}>
          View all {post.comments} comments
        </small>

      </div>
    </div>
  );
}

export default Postcard;
   

//npx json-server --watch db/data.json --port 3000 --static ./data