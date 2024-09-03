import {createBrowserRouter} from "react-router-dom";
import WebcamDetect from "./components/WebcamComponent";




import DefaultLayout from './components/DefaultLayout';

const router =  createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
         children:[
            
                {
                    path:'/detection',
                    element:<WebcamDetect/>
                },
                
                
        ] 
    },
  

   


])


 export default router;
