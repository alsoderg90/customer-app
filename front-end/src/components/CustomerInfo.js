const CustomerInfo = ( {customer }) => {
    const ObjectLengt = Object.keys(customer).length

return(
        <div className="info-container">      
            <div className="row">
                <div className="col-50 col">
                    <h3>Customer Info</h3>
                    <label> <i className="fa fa-user"></i> Name: { ObjectLengt !== 0 ?  customer.name : "" } </label>
                    <label> <i className="fas fa-city"></i> City: { ObjectLengt !== 0 ? customer.address.city : ""} </label>
                    <label> <i className="fas fa-university"></i>  State: {ObjectLengt !== 0 ? customer.address.streetAddress : ""}</label>
                    <label> <i className="fas fa-address-card"></i> Zip: { ObjectLengt !== 0 ? customer.address.zip : ""}</label>
                </div>
            </div>
        </div>
  )
}


export default CustomerInfo