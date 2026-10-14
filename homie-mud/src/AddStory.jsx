import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddStory() {

   let navigate = useNavigate()

  const [image, setImage] = useState(null)

  function handleImage(event) {
     const selectedimage = (event.target.files[0])

    if(selectedimage){
        setImage(URL.createObjectURL(selectedimage))
    }

    const newstory =  {
      "id": "5",
      "user": {
        "id": 101,
        "username": "Ronaldo",
        "profile": "/assets/cr.jpg"
      },
      "image": "/assets/cr7.jpg"
    }

     fetch('http://localhost:3000/story',{
        method : "Post",
        headers:{
           "Content-Type" : "application/json"
        },
        body:JSON.stringify(newstory)
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
    <div className="story-item mt-1">

      <input
        type="file"
        accept="image/*"
        id="story-input"
        onChange={handleImage}
        style={{ display: "none" }}
      />

      <label htmlFor="story-input">

        {/* Same ring as normal stories */}
        <div className="story-ring">

          {image ? (
            <img
              src={image}
              alt=""
              className="story-img"
            />
          ) : (
            <div className="story-add-circle">
              <i className="bi bi-plus-lg"></i>
            </div>
          )}

        </div>

      </label>

      <span className="story-name">
        { image? "your story" : "add story"}  
      </span>

    </div>
  )
}

export default AddStory