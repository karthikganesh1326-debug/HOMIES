import React, { useEffect, useState } from 'react'
import Postcard from './Postcard'

function Post({following , setfollowing}) {

    const [posts , setposts] = useState([]);
    const [load , setload] = useState(true);


    useEffect(()=>{

         setTimeout(()=>

        fetch('http://localhost:3000/posts')

        .then((data)=>{
            return data.json()
        })
        .then((data)=>{
            setposts(data)
            setload(false)
        })
        .catch((err)=>{
            console.log(err)
        })

        ,3000)
    },[])


function deletepost(id){

const filterpost = posts.filter((post)=>post.id !=id)    
setposts(filterpost)
}


const Postcards = posts.map((post)=>(
   
    <Postcard
        key = {post.id}
        post = {post}
        deletepost = {deletepost}
        following={following}
        setfollowing={setfollowing}
    
    
    />
))



if(load){
  return(
    <>
    <div className="loader-container">
    <img className='loader-gif'
     src="/assets/load.gif" alt="" />
     </div>
    </>
  )
}

  return (
    <div>
        {Postcards}
    </div>
  )
}

export default Post