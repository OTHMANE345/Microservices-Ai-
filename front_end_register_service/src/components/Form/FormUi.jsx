import React,{useRef} from "react";


import img1 from "../../assets/img/home.jpg";
import styles from './Form.module.css';
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useStateContext } from "../../contexts/ContextProvider";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {useState} from "react";


const Form = () => {

    const emailRef = useRef();
    const passwordRef = useRef();
   const navigate = useNavigate();
    const [errors, setErrors] = useState(null);

    const {setUser, setToken} = useStateContext(); 
    const [navig, setNavig] = useState(false);

    const onSubmit = (ev) =>{
        ev.preventDefault()
        const payload ={
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

       axiosClient.post('user/login', payload)
        .then(({data})=>{
             setUser(data.user)
             setToken(data.token)
             console.log(data);
             //we navigate here to show all houses instead , i need to correct that 
             window.location.href = 'http://localhost:3001/detection';

        }) 
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            setErrors(response.data.errors)
        }
    })


}
  return (
    <div className="container">
    <section className={styles.FormFor}>
        <div className={styles.register}>
         <div className={styles.col1}>
            <h2>Sign In</h2>
          
            <form id={styles.form345} className={`${styles.flex34} ${styles.flexcol7}`} onSubmit={onSubmit}>
             <input ref={emailRef} type="email" placeholder="Email" />
             <input  ref={passwordRef} type="text" placeholder="Password" />

             <button className={styles.btn}>Sign In</button>
             
            </form>
         </div>
         <div className={styles.col2}>
            <img src={img1} alt="a header image" />
         </div>
        </div>
    </section>
    </div>
  );
};

export default Form; 
