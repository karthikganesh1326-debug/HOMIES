import React, { useState , useEffect } from 'react'
import Userprofiletemplate from './Userprofiletemplate'
import { useParams } from 'react-router-dom';

function Profile({following , setfollowing}) {

    const [userprofile , setuserprofile] = useState(null)
      const [post , setpost] = useState([]);
        const [reel , setreel] = useState([]);

      let {id} = useParams()

   useEffect(()=>{
  
      fetch(`http://localhost:3000/userprofile/${id}`)
      .then((data)=>{
        return data.json()
      })
      .then((data)=>{
        console.log(data)
        setuserprofile(data)
      })
      .catch((err)=>{
        console.log(err)
      })
  
    },[id])


     useEffect(()=>{
      
      fetch('http://localhost:3000/posts')
    
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                setpost(data)
                
            })
            .catch((err)=>{
                console.log(err)
            })
    
            
        },[])

       useEffect(()=>{
      
      fetch('http://localhost:3000/reels')
    
            .then((data)=>{
                return data.json()
            })
            .then((data)=>{
                setreel(data)
                
            })
            .catch((err)=>{
                console.log(err)
            })
    
            
        },[])    


        if(!userprofile){
          return(
            <div>loading</div>
          )
        }
      
      const userfilter = post.filter((post)=>
       Number(post.user.id) === Number(userprofile.user.id)
      )

          const reelfilter = reel.filter((reel)=>
       Number(reel.user.id) === Number(userprofile.user.id)
      )

  




 return (
      <Userprofiletemplate
        Userprofiledata = {userprofile} 
        userPosts = {userfilter}
        userreels = {reelfilter}
        following = {following}
        setfollowing={setfollowing}
        />
    )

  }  







  


  


 


export default Profile