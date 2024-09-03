import React from 'react'
import image from '../assets/img/home.jpg'

function Home() {

  return (

<div className="landing">
    
    <div className="container">
       <div className="text">
        <h1>Title here, welcome </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, ut corporis quibusdam accusamus explicabo quaerat quasi illum inventore quis eius sequi voluptas assumenda reiciendis consequuntur totam unde quam sed pariatur!</p>
       </div>
       <div className="image">
           <img src={image}alt="" />
       </div>
    </div>
   
</div>
  )
}

export default Home