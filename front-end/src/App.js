import './App.scss';
import 'react-notifications-component/dist/theme.css'
import List from './components/List'
import Button from './components/CustomButton'
import CustomerInfo from './components/CustomerInfo'
import CustomerService from './services/customer'
import SearchField from './components/SearchField'
import { useEffect, useState } from 'react';

import { ReactNotifications } from 'react-notifications-component'
import { BrowserRouter as Router, 
  Switch, Route, NavLink, } from "react-router-dom"



const App = () => {
  //data from web
  const [ dataWeb, setDataWeb ] = useState([])
  //data from database
  const [ dataDB, setDataDB ] = useState([])
  // selected list item
  const [ selected, setSelected ] = useState({})
  // text filter 
  const [ filter, setFilter ] = useState("")
  // index of the active list element
  const [ activeIndex, setActive ] = useState("")
  
  useEffect(() => {
    CustomerService
     .getAll()
     .then(response => {
       setDataDB(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])
 
  useEffect(() => {
    CustomerService
     .getCustomers()
     .then(response => {
       setDataWeb(response.data)
     })
     .catch(error => {
      console.log(error)
    })
  }, [])

  return (
    
    <Router>
      <ReactNotifications/>
      <div className="nav-bar">
        <ul>
          <li>
            <NavLink 
              exact={true} 
              activeClassName='is-active' 
              to="/"
              onClick={() => { 
                setActive(-1)
                setSelected({}) 
                }}> 
              Customers
              <i className="fa-solid fa-users icon"></i>
            </NavLink>
          </li>
          <li>
            <NavLink 
              exact={true}
              activeClassName='is-active' 
              to="/database"
              onClick={() => { 
                setActive(-1)
                setSelected({}) 
                }}> Database 
              <i className="fa-solid fa-database icon"></i>
            </NavLink>
          </li>          
        </ul>
      </div>

    <Switch>
      <Route path="/database">
      <div className='container'>
        <div className='row'>
        <div className='col'>
          <div className='info-box col'>
          <CustomerInfo customer={selected}>
          </CustomerInfo>
          <div className='button-field'>
           <Button 
             text="Delete" 
             selected={selected}
             setDataDB={setDataDB}
             setDataWeb={setDataWeb}
             setActive={setActive}
             setSelected={setSelected}
             dataWeb={dataWeb}
             dataDB={dataDB} 
             color="red"
             type="delete">
           </Button>
           </div>
          </div>
        </div>
          <div className='col'>
            <SearchField 
              setFilter={setFilter}>
            </SearchField>
            <List 
              index={-1} 
              data={dataDB} 
              clickEvent={setSelected}
              filter={filter}
              setActive={setActive}
              activeIndex={activeIndex}>        
            </List>
          </div>
        </div>
      </div>
      </Route>

      <Route path="/">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <SearchField 
              setFilter={setFilter}>
            </SearchField>
            <div className='button-field'>
              <Button 
                text="Add" 
                selected={selected} 
                dataWeb={dataWeb}
                dataDB={dataDB} 
                setDataDB={setDataDB}
                setDataWeb={setDataWeb}
                setActive={setActive}
                setSelected={setSelected}
                color="blue"
                type="add">
              </Button> 
            </div>
            <List
             index={-1} 
             data={dataWeb} 
             clickEvent={setSelected}
             filter={filter}
             setActive={setActive}
             activeIndex={activeIndex}>   
            </List>
          </div>
        </div>
        </div>
      </Route>      
    </Switch>
  </Router>
  )
}

export default App;
