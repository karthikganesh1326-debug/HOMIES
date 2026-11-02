import React, { useState, useEffect } from 'react'
import axios from 'axios'


import Sidebar from './Sidebar'
import Suggestions from './Suggestions'
import Layout from './Layout'
import Search from './Search'
import {createBrowserRouter , RouterProvider } from 'react-router-dom'
import Profile from './Profile'
import Reels from './Reels'
import Postnewtemplate from './Postnewtemplate'
import Reelnewtemplate from './Reelnewtemplate'
import Premium from './Premium'
import Messages from './Messages'
import Join from './Join'
import Register from './Register'
import Login from './Login'

function App() {

const [following , setfollowing] = useState([])

 useEffect(() => {

    async function getfollowing() {

      const response = await axios.get(
        'http://localhost:3000/userprofile/101'
      )

      setfollowing(response.data.user.following)

    }

    getfollowing()

  }, [])


let router = createBrowserRouter([

  {
    path : '/register',
    element :<Register/>
  },
    {
    path : '/',
    element :<Login/>
  },
  {
    path : '/home',
    element : <Layout following={following}
                                    setfollowing={setfollowing}/>
  },
    {
    path : '/search',
    element : <Search following={following}
                                    setfollowing={setfollowing}/>
  },
  {
    path : '/userprofile',
    element : <Profile following={following}
                                    setfollowing={setfollowing}/>
  },
    {
    path : '/reels',
    element : <Reels/>
  },
      {
    path : '/create/post',
    element : <Postnewtemplate/>
  },
        {
    path : '/create/reel',
    element : <Reelnewtemplate/>
  },
  {
      path : '/userprofile/:id',
    element : <Profile  following={following}
                                    setfollowing={setfollowing}/>
  },
    {
    path : '/premium',
    element : <Premium/>
  },
      {
    path : '/messages',
    element : <Messages/>
  },
         {
    path : '/join',
    element : <Join/>
  },
      

])




  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App