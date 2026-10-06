import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Postnewtemplate() {

  const [image, setImage] = useState(null)
  const [caption, setCaption] = useState("")

   let navigate = useNavigate()




  function handleImage(event) {

    setImage(event.target.files[0])

  }


  function handlePost(event) {

    event.preventDefault()

    const newPost = {
    
      "id": 6,
      "user": {
        "id": 101,
        "username": "Ronaldo",
        "profile": "/assets/cr.jpg"
      },
      "image": "/assets/cr7.jpg",
      "caption": caption,
      "likes": 0,
      "comments": 0
    
}

  fetch('http://localhost:3000/posts',{
    method:"POST",
    headers:{
      "Content-Type" : "application/json"
    },
    body:JSON.stringify(newPost)
})
     .then((data)=>{
              return data.json()
          })
          .then((data)=>{
             console.log(data)
            navigate('/home')
              
          })

  }





  return (
    <div className="container mt-5">

      <div
        className="card mx-auto shadow"
        style={{ maxWidth: "500px" }}
      >

        <div className="card-header text-center">
          <h4>Create Post</h4>
        </div>


        <div className="card-body">

          <form onSubmit={handlePost}>

            {/* Image */}
            <div className="mb-3">

              <label className="form-label">
                Select Image
              </label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImage}
              />

            </div>


            {/* Image preview */}
            {image && (
              <div className="mb-3">

                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "300px",
                    width: "100%",
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
                onChange={(e) => setCaption(e.target.value)}
              />

            </div>


            {/* Post button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Post
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default Postnewtemplate