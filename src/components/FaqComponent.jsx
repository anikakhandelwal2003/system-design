import React, { useState } from 'react'
import '../styles/faqComponent.css'

function FaqComponent({data}) {
    const [openFaq,setOpenFaq]=useState([]);

    const handleOpenQuestion=(id)=>{
       if(openFaq.includes(id))
       {
        setOpenFaq(openFaq.filter((item)=>item!=id))
       }
       else{
        setOpenFaq([...openFaq,id])
       }
    }
    
    const handleOpenAll=()=>{
        setOpenFaq([]);
        setOpenFaq(
            data.map((item)=>item.id)
        )
    
    }
    
  return (
    <div>
        <h1>FAQ Component</h1>
        <button onClick={()=>handleOpenAll()}>Open All</button>
        <button onClick={()=>setOpenFaq([])}>Close All</button>
        <div className='faq-question'>
        {data.map((item)=>{
        return(
            <>
            <p className ='question' onClick={()=> handleOpenQuestion(item.id)}>{item.title}</p>
            {(openFaq.includes(item.id)) && <p className='answer'>{item.description}</p>}
            </>
        )
      })}
        </div>

    </div>
  )
}

export default FaqComponent