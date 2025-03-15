"use client";

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import Tag from '@/components/Tag';

const Tags = ({params}) => {
  const [tags,setTags]=useState([]);
  const [loading,setLoading]=useState(true);

const fetchTags=async()=>{
  try{
    const response=await axios.get("https://qevent-backend.labs.crio.do/tags");
    setTags(response.data);
  }catch(error){
    console.error("Error while fetching Tags ",error);
  }finally{
    setLoading(false);
  }

}
useEffect(()=>{
fetchTags();
},[])

  return (
    <div className='flex flex-wrap gap-4 justify-center items-center m-4'>{
      loading?<div>Loading...</div>:
      tags.length>0?
      tags.map(tagName=>(
<Tag text={tagName.name} key={tagName.id} />
      )):
      <div>No data to Show</div>
      }</div>
  )
}

export default Tags