import React, { useEffect, useState } from 'react'
import FaqComponent from './FaqComponent';

function MainFaqComponent() {
 const [data,setData]=useState([])

 const fetchData= async()=>{
     await fetch("https://dummyjson.com/products")
     .then(async(value)=>{
     const resData=await value.json();
     setData(resData.products)
     });
 }

 useEffect(()=>{
    fetchData(); 
 },[])

  return (
   <>
   <FaqComponent data={data}/>
   </>
  )
}

export default MainFaqComponent