import React from 'react'

function Storytemplate({ story, index, showstory }) {

  return (

    <div
      onClick={() => showstory(index)}
      className="story-item mt-1"
    >

      <div className="story-ring">

        <img
          src={story.image}
          alt=""
          className="story-img"
        />

      </div>


      <span className="story-name">

        {story.user.username}

      </span>

    </div>

  )

}

export default Storytemplate