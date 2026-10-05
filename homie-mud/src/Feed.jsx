import React from 'react'
import Story from './story'
import Post from './Post'

function Feed({following , setfollowing}) {
  return (
    <>
    
    <div className='d-flex flex-column'>
       <div className='story'><Story following={following}
                                    setfollowing={setfollowing}/></div>

       <div ><Post following={following}
                   setfollowing={setfollowing}/></div>
       
    </div>
    </>
  )
}

export default Feed