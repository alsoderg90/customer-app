import React from 'react'

const CustomerInfo = ( props ) => {
    const customer = props.customer
    const address = customer.address
    const ObjectLengt = Object.keys(customer).length

const changeName = (e) => {
    props.setSelected( {...customer, name: e.target.value} )
}

const changeCity = (e) => {
    props.setSelected( {...customer, address : { ...address, city : e.target.value}} )
}

const changeStreet = (e) => {
    props.setSelected( {...customer, address : { ...address, streetAddress : e.target.value}} )
}

const changeZip = (e) => {
    props.setSelected( {...customer, address : { ...address, zip : e.target.value}} )
}

const undo = () => {
    props.setSelected(props.copy);
}

return(
    <div className="info-container">      
        <div className="row">
            <div className="col-50 col">
                <h3>Customer Info</h3>
                <div className="labels">
                <label> <i className="fa fa-user"></i>Name: </label>
                <label> <i className="fas fa-city"></i> City: </label>
                <label> <i className="fas fa-university"></i> State: </label>
                <label> <i className="fas fa-address-card"></i> Zip: </label>
                </div>
                <div className='inputs'>
                 <input 
                    onChange={changeName} 
                    value={ ObjectLengt > 0 ?  customer.name : "" } />
                 <input 
                    onChange={changeCity} 
                    value={ ObjectLengt > 0 ? address.city : ""}/>
                  <input 
                    onChange={changeStreet} 
                    value={ ObjectLengt > 0 ? address.streetAddress : ""}
                  /> 
                 <input 
                    onChange={changeZip} 
                    value={ ObjectLengt > 0 ? customer.address.zip : ""}
                  /> 
                </div> 
            </div>
        </div>
        <button className='button lila'
          onClick={undo}>
          Undo
        </button>
    </div>
  )
}


export default CustomerInfo