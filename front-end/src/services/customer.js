import axios from "axios";
const baseUrl = 'https://localhost:7100/api/customers/'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newObject => {
    return axios.post(baseUrl, newObject)
  }
  
 
  const customerService =  { 
    getAll, 
    create, 
  }

  export default customerService