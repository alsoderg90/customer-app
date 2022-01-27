import './App.css';
import List from './components/List'
import Button from './components/Button'
import customerService from './services/customer'
import { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
  //data from web
  const [ dataWeb, setDataWeb ] = useState([])
  //data from database
  const [ dataDB, setDataDB] = useState([])
  // selected list item
  const [ selected, setSelected ] = useState({
    id : -1,
    name : ""
  })

  useEffect(() => {
    customerService
     .getAll()
     .then(response => {
       setDataDB(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])
 
  useEffect(() => {
    axios
     .get('http://www.filltext.com/?rows=5&pretty=true&id={index}&name={business}&address={addressObject}')
     .then(response => {
       setDataWeb(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div className='container'>
      <div className='row'> 
        <div className="col"> Customers
          <List data={dataWeb} clickEvent={setSelected}></List>
          <p>Selected: { selected.name }</p> 
          <Button text="Add" 
            value={selected.id} 
            dataWeb={dataWeb}
            dataDB={dataDB} 
            setData={setDataDB}>
          </Button>
          </div>
      <div className="col"> Database
        <List data={dataDB} clickEvent={setSelected}></List>
        <Button 
          text="Add" 
          value={selected.id} 
          data={dataWeb}>
        </Button>
      </div>
    </div>
  </div>
  )
}

export default App;
