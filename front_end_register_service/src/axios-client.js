import axios from "axios" ;
const BOOK_API_REST_URL = "http://localhost:8082";



const axiosClient = axios.create({
  baseURL: `${BOOK_API_REST_URL}/`

})

axiosClient.interceptors.request.use((config)=>{
    const token = localStorage.getItem('ACCESS_TOKEN')
    config.headers.Authorization=`Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use((response)=>{
    return response;
},(errorResponse)=>{
    const {response}= errorResponse;
    if(response.status == 401){
        localStorage.removeItem('ACCESS_TOKEN')
    }
    throw errorResponse;
})




export default axiosClient;
