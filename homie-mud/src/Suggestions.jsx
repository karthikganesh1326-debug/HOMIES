import React from 'react'
import Userseg from './Userseg'
import Recommend from './Recommend'

function Suggestions({following , setfollowing}) {
  return (
    <div className='d-flex flex-column position-fixed' style={{width : '30%', height : '100vh'}}>
        <div className='userreg '><Userseg/></div>
        <div className='rec'><Recommend following={following}
                                        setfollowing={setfollowing}/></div>
    </div>
  )
}

export default Suggestions