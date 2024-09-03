import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const NavBarFor = () => {
const {user, token} = useStateContext()
const navigate = useNavigate();
const {setUser, setToken} = useStateContext();

const logout = (ev) =>{
         setUser({})
         setToken(null)
        localStorage.removeItem('ACCESS_TOKEN')
        navigate('/login')
       
}

  return (
<>
  

  <div className="header">
<div className="container">

  <a href="#" className='logo'>Detection  Service </a>
  <ul className='main-nav'>
 
                <li><Link to="/detection" >detection</Link></li>

            
              

    
  </ul>
</div>
</div>
  </>
  );
};

export default NavBarFor                  ; 