import React, { useEffect, useState } from 'react'
import Test from './Test';

function MainTest() {
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
   <Test
   data={data}/>
   </>
  )
}

export default MainTest