import React ,{useEffect, useState}from 'react';
import '../styles/test.css'

function Test() {
    const [timer ,setTimer]=useState({
      Hour:0,
      Minutes:0,
      Second:0
    })
    const[isStart,setStart]=useState(flase);
    useEffect(()=>{
      if(isStart)
      {
        setInterval(()=>{
          showTime();
        },1000)
      }
    },[isStart])


    const showTime=()=>{
      totalTime=hour*3600+minute*60+second
    }
  return (
    <div>
      <label htmlFor="hour">Hour</label>
      <input type='number' id='hour' value={timer.Hour}></input>
      <label htmlFor="minutes">minutes</label>
      <input type='number' id='minutes' value={timer.Minutes}></input>
      <label htmlFor="second">second</label>
      <input type='number' id='second' value={timer.Second}></input>
    <button onClick={()=>{
      setStart(true);
    }}>Start</button>
    <button onClick={()=>setStart(false)}>Stop</button>
    <button onClick={()=>{
      setTimer({
        Hour:0,
        Minutes:0,
        Second:0
      })
    }}>Reset</button>
    </div>
    
  )
}

export default Test