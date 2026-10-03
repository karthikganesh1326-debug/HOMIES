import React from 'react'
import Storytemplate from './Storytemplate'
import { useState, useEffect } from 'react'
import AddStory from './Addstory'

function Story() {

  const [stories, setstories] = useState([])

  const [stimg, setstimg] = useState(false)

  const [cureentindex, setindex] = useState(0)


  useEffect(() => {

    fetch('http://localhost:3000/story')

      .then((data) => {
        return data.json()
      })

      .then((data) => {
        setstories(data)
      })

      .catch((err) => {
        console.log(err)
      })

  }, [])


  


  function showstory(index) {

    setindex(index)

    setstimg(true)

  }


  function close() {

    setstimg(false)

  }


  function nextstory() {

    if (cureentindex < stories.length - 1) {

      setindex(cureentindex + 1)

    } else {

      setstimg(false)

    }

  }


const currentstory = stories[cureentindex]

useEffect(() => {

  if (!stimg || !currentstoryy) {
    return
  }

  const timer = setTimeout(() => {

    if (cureentindex < stories.length - 1) {

      setindex(cureentindex + 1)

    } else {

      setstimg(false)

    }

  }, 5000)

  return () => {
    clearTimeout(timer)
  }

}, [stimg, cureentindex, stories.length])


  function prevstory() {

    if (cureentindex > 0) {

      setindex(cureentindex - 1)

    }

  }


  const storydata = stories.map((story, index) => (

    <Storytemplate

      key={story.id}

      story={story}

      index={index}

      showstory={showstory}

    />

  ))




  return (

    <div className='d-flex'>

      <AddStory />

      <div className="story-scroll">

        {storydata}

      </div>


      {stimg && currentstory && (

        <div className="story-view d-flex flex-nowrap">

          {/* progress bar */}

          <div className="story-progress">

            <div className="story-progress-fill"></div>

          </div>


          {/* header */}

          <div className="story-header">

            <div
              className="d-flex align-items-center"
              onClick={() =>
                window.location.href =
                `/userprofile/${currentstory.user.id}`
              }
            >

              <img
                src={currentstory.user.profile}
                alt=""
                className="story-profile"
              />

              <span className="text-white ms-2">

                {currentstory.user.username}

              </span>

            </div>


            <button
              onClick={close}
              className="btn text-white ms-auto"
            >

              <i className="bi bi-x-lg"></i>

            </button>

          </div>


          {/* story */}

          <div className="story-image-container">


            <button
              onClick={prevstory}
              className="btn text-white"
            >

              <i className="bi bi-chevron-left"></i>

            </button>


            <img
              src={currentstory.image}
              alt=""
              className="story-full-img"
            />


            <button
              onClick={nextstory}
              className="btn text-white"
            >

              <i className="bi bi-chevron-right"></i>

            </button>


          </div>

        </div>

      )}

    </div>

  )
}

export default Story