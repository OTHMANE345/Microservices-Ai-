import {createBrowserRouter} from "react-router-dom";
import FormforSingUp from "./components/FormForSingUp/FormUiforSingUp";
import Form from "./components/Form/FormUi";
import Home from "./components/home";





import DefaultLayout from './components/DefaultLayout';

const router =  createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
         children:[
            
                {
                    path:'/singup',
                    element:<FormforSingUp/>
                },
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/login',
                    element:<Form/>
                },
                
        ] 
    },
  

   


])


 export default router;
