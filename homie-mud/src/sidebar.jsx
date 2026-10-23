import React, { useState,useRef, useEffect } from 'react'
import { Link, Links, useNavigate } from 'react-router-dom'

function Sidebar() {

  let navigate = useNavigate()

  const [createbtn , setcreatebtn] = useState(false)

  let clickref = useRef(null)

  function createbutton(){
    setcreatebtn((prev)=>!prev)
    console.log("create")
  }


  useEffect(
    ()=>{
      function cliclhandle(event){
          if(clickref.current &&
            !clickref.current.contains(event.target))
          setcreatebtn(false)

        }
       document.addEventListener("click" , cliclhandle)

       return(()=>
        document.removeEventListener("click",cliclhandle)
       )
      },[]
  )

function postbtn(){
  navigate('/create/post')
}

function reelbtn(){
  navigate('/create/reel')
}

  function home(){
    navigate('/home')
  }

  return (
    <>
    <div className="m-3 position-fixed ">
    <div className='d-flex flex-column gap-3 ms-3'>
        <img className='logo'  src="/assets/homie-img.png" alt="" />

        <div  onClick={()=>home()}><i className="bi bi-house-door"></i>Home</div>
        <div onClick={()=>navigate('/search')}><i className="bi bi-search  "></i>Search</div>
        <div onClick={()=>navigate('/reels')} ><i className="bi bi-camera-reels  "></i>Reels</div>
        <div  onClick={()=>navigate('/messages')}><i className="bi bi-chat-dots  "></i>Messages</div>
       
       
           <div   ref={clickref} className="position-relative">

                <div onClick={createbutton}>
                  <i className="bi bi-plus-square"></i>
                  Create
                </div>

                {createbtn && (
                  <div
                    className="position-absolute bg-white border rounded-3 shadow p-2 "
                    style={{
                      left: "70%",
                      top: "0",
                      width: "150px",
                      zIndex: 1000
                    }}
                  >

                    <div className="p-2" onClick={postbtn}>
                      <i className="bi bi-image me-2"></i>
                      Post
                    </div>

                    <div className="p-2"onClick={reelbtn}>
                      <i className="bi bi-camera-reels me-2"></i>
                      Reels
                    </div>

                  </div>
                )}

            </div>
    <div onClick={()=>navigate('/userprofile/101')}><i className="bi bi-person  "></i>Profile</div>
    </div>
    <div className='position-fixed bottom-0 d-flex flex-column gap-3 ms-3 mb-4'>
          <div onClick={()=>navigate('/join')}><i className="bi bi-box-arrow-up-right "></i>Join</div>
         <div  onClick={()=>navigate('/premium')}><i className="bi bi-patch-check"></i>Premium</div>
    </div>
</div>

</>
  )
}

export default Sidebar