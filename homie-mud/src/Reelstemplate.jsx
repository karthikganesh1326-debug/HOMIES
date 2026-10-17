import React, { useEffect,useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"



function Reelstemplate({ reeldata }) {

let reelref = useRef(null)

const [likebtn , setlikebtn] = useState(reeldata.liked)

const [like , setlike] = useState(reeldata)


const navigate = useNavigate()


function userdetail(id){
  navigate(`/userprofile/${reeldata.user.id}`)
}

useEffect(()=>{

  const observer = new IntersectionObserver(
    ([entry])=>{
      if(entry.isIntersecting){
        reelref.current.play()
      }
      else{
        reelref.current.pause()
      }
    },{
    threshold : 0.7
    }
  )
  observer.observe(reelref.current)

  return(
    ()=>observer.disconnect()
  
  )

},[])


function likebutton(){
  setlikebtn((prev)=>!prev)

  const likedata = ({
    ...like,
    likes : likebtn? like.likes-1 : like.likes+1,
    liked : !likebtn
  })

  setlike(likedata)

  axios.put(`http://localhost:3000/reels/${reeldata.id}`,likedata)
}




  return (
    <div className="d-flex justify-content-center mb-4 reel-item ">

      <div
        className="position-relative bg-dark rounded-4 overflow-hidden"
        style={{
          width: "400px",
          height: "590px"
        }}
      >

        {/* Video */}
        <video
          ref={reelref}
          src={reeldata.video}
          controls
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
          autoPlay
          muted
          loop
        />


        {/* User */}
        <div onClick={()=>userdetail(reeldata.user.id)} className="position-absolute top-0 start-0 p-3 d-flex align-items-center">

          <img
            src={reeldata.user.profile}
            alt=""
            className="rounded-circle border border-white"
            width="40"
            height="40"
          />

          <span className="ms-2 fw-semibold text-white">
            {reeldata.user.username}
          </span>

        </div>


        {/* Caption */}
        <div className="position-absolute bottom-0 start-0 p-3 text-white">

          <strong>{reeldata.user.username}</strong>

          <span className="ms-2">
            {reeldata.caption}
          </span>

        </div>


        {/* Actions */}
        <div className="position-absolute bottom-0 end-0 p-3 d-flex flex-column gap-4 text-white">


           {/* like */}
          <div className="text-center">
            <div>
              <i   className=
              {likebtn ? "bi bi-heart-fill text-danger fs-4 me-3" :"bi bi-heart fs-4 me-3"} 
                  onClick={likebutton}>

            </i>
            </div>
            
            <small>{like.likes}</small>
          </div>

          <div className="text-center">
            <div>💬</div>
            <small>{reeldata.comments}</small>
          </div>

          <div className="text-center">
            <div>👁️</div>
            <small>{reeldata.views}</small>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Reelstemplate