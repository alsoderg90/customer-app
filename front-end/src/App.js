import './App.css';
import List from './components/List'
import { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
  //data from web
  const [ dataWeb, setDataWeb ] = useState([])
  //data from database
  const [ dataDB, setDataDB] = useState([])

 
  useEffect(() => {
    axios
     .get('http://www.filltext.com/?rows=100&pretty=true&id={index}&name={business}&address={addressObject}')
     .then(response => {
       setDataWeb(response.data)
       console.log(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])



  return (
      <List data={dataWeb}></List>
  )
}

export default App;
