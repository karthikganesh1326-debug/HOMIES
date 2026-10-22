import React from 'react'
import { useNavigate } from 'react-router-dom'


function Profilesugtemplate({profile}) {

const navigate = useNavigate()


function userdetail(id){
  navigate(`/userprofile/${profile.id}`)
}

  return (
    <div className='mx-4 my-4 '>
         <div  onClick={()=>userdetail(profile.id)} className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={profile.profile}
            alt=""
            className="rounded-circle"
            width="35"
            height="35"
          />

          <span className="ms-2 fw-semibold">{profile.username}</span>
        </div>

        <span className='text-info'
         style={{ cursor: "pointer" }}
         onClick={(e)=>{
          e.stopPropagation()
          navigate('/')}
         }
         >Switch</span>
         
      </div>
    </div>
  )
}

export default Profilesugtemplate