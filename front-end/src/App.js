import './App.scss';
import { BrowserRouter as Router, 
  Switch, Route, NavLink, 
 } from "react-router-dom"
import List from './components/List'
import Button from './components/Button'
import CustomerInfo from './components/CustomerInfo'
import CustomerService from './services/customer'
import SearchField from './components/SearchField'
import { useEffect, useState } from 'react';
import axios from 'axios';


const App = () => {
  //data from web
  const [ dataWeb, setDataWeb ] = useState([])
  //data from database
  const [ dataDB, setDataDB ] = useState([])
  // selected list item
  const [ selected, setSelected ] = useState({})
  // text filter 
  const [ filter, setFilter ] = useState("")

  useEffect(() => {
    CustomerService
     .getAll()
     .then(response => {
       setDataDB(response.data)
       console.log(response.data);
       
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
       console.log(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <Router>
      <div className="nav-bar">
        <ul>
          <li>
            <NavLink 
              exact={true} 
              activeClassName='is-active' 
              to="/customers"> Customers
              <i className="fa-solid fa-users icon"></i>
            </NavLink>
          </li>
          <li>
            <NavLink 
              exact={true}
              activeClassName='is-active' 
              to="/database"> Database 
              <i className="fa-solid fa-database icon"></i>
            </NavLink>
          </li>
        </ul>
      </div>

    <Switch>
      <Route path="/customers">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <SearchField 
              setFilter={setFilter}>
            </SearchField>
            <List 
             data={dataWeb} 
             clickEvent={setSelected}
             filter={filter}>
            </List>
          </div>
        </div>
        </div>
        <div className='button'>
          <p>Selected: { selected.name }</p> 
          <Button 
            text="Add" 
            value={selected.id} 
            dataWeb={dataWeb}
            dataDB={dataDB} 
            setData={setDataDB}>
          </Button>
        </div>
      </Route>

      <Route path="/database">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <SearchField 
              setFilter={setFilter}>
            </SearchField>
            <List 
              data={dataDB} 
              clickEvent={setSelected}
              filter={filter}>
            </List>
          </div>
        <div className='button col'>
          <CustomerInfo customer={selected}>
          </CustomerInfo>
          <Button 
            text="Delete" 
            value={selected.id} 
            data={dataWeb}>
          </Button>
        </div>
        </div>
      </div>
      </Route>
    </Switch>
  </Router>
  )
}

export default App;
