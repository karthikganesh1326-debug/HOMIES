import React from 'react'
import { useState,useEffect } from 'react';
import Searchtemplate from './Searchtemplate'

function Search({following , setfollowing}) {
  
const[search , setsearch] = useState("");
const [data , setdata] = useState([]);

   useEffect(()=>{
  
      fetch('http://localhost:3000/userprofile')
      .then((data)=>{
        return data.json()
      })
      .then((data)=>{
        setdata(data)
      })
      .catch((err)=>{
        console.log(err)
      })
  
    },[])




function get(event){
    setsearch(event.target.value)
    console.log(event.target.value)

   
   
}



const datafilter = data.filter((data)=>
  
    data.user.username.toLowerCase().includes(search.toLowerCase())

  )

const datatrim = search ? datafilter : data.slice(0,1);




    const searchsuggest = datatrim.map((search)=>
      <Searchtemplate
        key = {search.id}
        searchdata = {search}
        following={following}
        setfollowing={setfollowing} 
        />
    )



  return (
    <>
    <div className='search-item '>
    <div>
        <form className="d-flex" role="search">
        <input className="form-control me-2" type="search"  value={search}onChange={get} placeholder="Search" aria-label="Search"/>
      </form>
    </div>


 
    <div >
       
       <div className='mt-4'>
      {search.length>0 && datafilter.length==0 &&
        <p>user not found</p>}
        </div>
      
          {searchsuggest}


    </div>

    </div>

      </>
    )
  

}

export default Search