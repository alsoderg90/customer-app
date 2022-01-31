import axios from "axios";

const apiUrl = 'https://localhost:7100/api/customers/'
const customersUrl = 'http://wwwASDxt.com/?rows=5&pretty=true&id={index}&name={business}&address={addressObject}'

const getCustomers = () => {
  return axios.get(customersUrl)
}

const getAll = () => {
    return axios.get(apiUrl)
  }
  
  const create = newObject => {
    return axios.post(apiUrl, newObject)
  }

  const Delete = id => {
    console.log(id , "moi")
    return axios.delete(`${apiUrl}${id}`)
  }
  
  const customerService =  { 
    getAll, 
    create, 
    Delete,
    getCustomers
  }

  export default customerService