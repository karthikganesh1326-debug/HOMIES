import React, { useState,useEffect } from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'
import Suggestions from './Suggestions'
import axios from "axios"
import Search from './Search'


function Layout({following , setfollowing}) {



       
  

  return (
    <div className="d-flex vh-100  ">
        <div className='w-20 '><Sidebar following={following}
                                      setfollowing={setfollowing}/></div>

        <div className='w-50 '><Feed following={following}
                                      setfollowing={setfollowing} /></div>
                                      
        <div className='w-30 '><Suggestions following={following}
                                            setfollowing={setfollowing} /></div>
    </div>
  )
}

export default Layout