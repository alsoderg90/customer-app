const CustomerInfo = () => {

return(
    <div className="col-75 col">
        <div className="info-container">      
            <div className="row">
                <div className="col-50 col">
                    <h3>Customer Info</h3>
                    <label> <i className="fa fa-user"></i> Name: </label>
                    <label> <i className="fas fa-city"></i> City: </label>
                    <label> <i className="fas fa-university"></i> State:</label>
                    <label> <i className="fas fa-address-card"></i> Zip:</label>
                </div>
            </div>
        </div>
    </div>
  )
}


export default CustomerInfo