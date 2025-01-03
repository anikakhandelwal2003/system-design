import React, { useEffect, useState } from 'react'
import DropDownWithSearch from './DropDownWithSearch';

function MainDropDown() {
 const [data,setData]=useState([])
 const[selectedData,setSelectedData]=useState([]);

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
console.log(selectedData,"seleted Data");

  return (
   <>
   <DropDownWithSearch
   setSelectedData={setSelectedData}
   data={data}
   isMulti
   />
   </>
  )
}

export default MainDropDown