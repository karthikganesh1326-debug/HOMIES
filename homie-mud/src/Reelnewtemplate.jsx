import React, { useState,useMemo } from 'react'
import { data } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function Reelnewtemplate() {

  const [reel, setreel] = useState(null)
  const [caption, setcaption] = useState("")


     let navigate = useNavigate()

  function handlevideo(event) {
    setreel(event.target.files[0])
  }


  function handlereel(event) {

    event.preventDefault()

    const newreel = {
       
      "id": "4",
      "user": {
        "id": 101,
        "username": "Ronaldo",
        "profile": "/assets/cr.jpg"
      },
      "video": "/assets/ronaldo.mp4",
      "caption": caption,
      "likes": 0,
      "comments": 0,
      "views": 0
    }
  

      fetch('http://localhost:3000/reels',{
        method : "Post",
        headers:{
           "Content-Type" : "application/json"
        },
        body:JSON.stringify(newreel)
      })
      .then((data)=>{
        return data.json()
      })
      .then((data)=>{
        console.log(data)
          navigate('/home')
      })
  }

  const reelmemo = useMemo(()=>{
    if(!reel){
      return setreel(null)
    }

    return URL.createObjectURL(reel)
  },[reel])


  return (
    <div className="container mt-5">

      <div
        className="card mx-auto shadow"
        style={{ maxWidth: "500px" }}
      >

        {/* Header */}
        <div className="card-header text-center">
          <h4>Create Reel</h4>
        </div>


        <div className="card-body">

          <form onSubmit={handlereel}>

            {/* Video */}
            <div className="mb-3">

              <label className="form-label">
                Select Video
              </label>

              <input
                type="file"
                accept="video/*"
                className="form-control"
                onChange={handlevideo}
              />

            </div>


            {/* Video Preview */}
            {reel && (
              <div className="mb-3">

                <video
                  src={reelmemo}
                  controls
                  className="w-100 rounded"
                  style={{
                    maxHeight: "400px",
                    objectFit: "cover"
                  }}
                />

              </div>
            )}


            {/* Caption */}
            <div className="mb-3">

              <label className="form-label">
                Caption
              </label>

              <textarea
                className="form-control"
                rows="3"
                placeholder="Write a caption..."
                value={caption}
                onChange={(event) =>
                  setcaption(event.target.value)
                }
              />

            </div>


            {/* Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Post Reel
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Reelnewtemplate