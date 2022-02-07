import axios from "axios";

const apiUrl = 'https://my-customer-app.azurewebsites.net/api/customers/'
const customersUrl = 'http://www.filltext.com/?rows=100&pretty=true&id={index}&name={business}&address={addressObject}'

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
    return axios.delete(`${apiUrl}${id}`)
  }

  const Edit = (id, object) => {
    console.log(id, object)
    return axios.put(`${apiUrl}${id}`, object)
  }
  
  const customerService =  { 
    getAll, 
    create, 
    Delete,
    Edit,
    getCustomers
  }

  export default customerService