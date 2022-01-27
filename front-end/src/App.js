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
  // index of the active list element
  const [ activeIndex, setActive ] = useState("")

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
              to="/customers"
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
      <Route path="/customers">
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <SearchField 
              setFilter={setFilter}>
            </SearchField>
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
        <div className='button-field'>
          <p>Selected: {selected.name}</p> 
          <Button 
            text="Add" 
            id={selected.id} 
            dataWeb={dataWeb}
            dataDB={dataDB} 
            setData={setDataDB}
            color="blue"
            type="add">
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
              index={-1} 
              data={dataDB} 
              clickEvent={setSelected}
              filter={filter}
              setActive={setActive}
              activeIndex={activeIndex}>        
            </List>
          </div>
        <div className='info-box col'>
          <CustomerInfo customer={selected}>
          </CustomerInfo>
          <div className='button-field'>
           <Button 
             text="Delete" 
             value={selected.id} 
             data={dataWeb}
             color="red"
             type="delete">
           </Button>
          </div>
        </div>
        </div>
      </div>
      </Route>
    </Switch>
  </Router>
  )
}

export default App;
