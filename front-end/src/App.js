import './App.scss';
import 'react-notifications-component/dist/theme.css'
import data from './data.json'
import customer from './customer.json'
import List from './components/List'
import Button from './components/CustomButton'
import CustomerInfo from './components/CustomerInfo'
import CustomerService from './services/customer'
import SearchField from './components/SearchField'
import { useEffect, useState } from 'react';
import { ReactNotifications } from 'react-notifications-component'
import { HashRouter as Router, 
  Switch, Route, NavLink, } from "react-router-dom"

const App = () => {

  //data from web
  const [ dataWeb, setDataWeb ] = useState([])
  //data from database
  const [ dataDB, setDataDB ] = useState([])
  // selected list item
  const [ selected, setSelected ] = useState(customer)
  // text filter 
  const [ filter, setFilter ] = useState("")
  // index of the active list element
  const [ activeIndex, setActive ] = useState("")

  const [copy, setCopy ] = useState(customer)
  
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
      setDataWeb(data)
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
                setFilter("")
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
                setFilter("") 
                }}> Database 
              <i className="fa-solid fa-database icon"></i>
            </NavLink>
          </li>              
        </ul>
      </div>

    <Switch>
      <Route path={"/customer"}>
      <div className='container'>
       <div className='row'>
         <div className='col info-area'>
          <CustomerInfo 
            customer={selected}
            setSelected={setSelected}
            copy={copy}>        
          </CustomerInfo>
          <Button 
               dataWeb={dataWeb}
               dataDB={dataDB} 
               selected={selected}
               setDataWeb={setDataWeb}
               setDataDB={setDataDB}
               setSelected={setSelected}
               setActive={setActive}
               type="Edit">
           </Button>  
           <Button 
               dataWeb={dataWeb}
               dataDB={dataDB} 
               selected={selected}
               setDataWeb={setDataWeb}
               setDataDB={setDataDB}
               setSelected={setSelected}
               setActive={setActive}
               type="Delete">
           </Button>  
        </div>
        </div>
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
              setCopy={setCopy}
              redirect={true}
              index={-1} 
              data={dataDB} 
              filter={filter}
              activeIndex={activeIndex}
              setSelected={setSelected}
              setActive={setActive}> 
              <Button 
               dataWeb={dataWeb}
               dataDB={dataDB} 
               selected={selected}
               setDataWeb={setDataWeb}
               setDataDB={setDataDB}
               setSelected={setSelected}
               setActive={setActive}
               type="Delete">
           </Button>                   
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
            </div>
            <List
             setCopy={setCopy}
             redirect={false}
             index={-1} 
             data={dataWeb} 
             activeIndex={activeIndex}  
             filter={filter}        
             setSelected={setSelected}
             setActive={setActive}>
              <Button 
                selected={selected} 
                dataWeb={dataWeb}
                dataDB={dataDB} 
                setDataDB={setDataDB}
                setDataWeb={setDataWeb}
                setActive={setActive}
                setSelected={setSelected}
                type="Add">
              </Button>                   
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
