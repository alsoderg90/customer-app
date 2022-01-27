import customerService from '../services/customer'

const CustomButton = ({text, id, dataWeb, dataDB, setData, color , type}) => {

    const handleClick = () => {

        switch(type) {
            case "delete":
                deleteCustomer()
                break
            case "add":
                addCustomer()
                break;
            default:
        }
    }

    function deleteCustomer() {
        window.confirm("Are You Sure?")
    }

    function addCustomer() {
        const customer = dataWeb.filter(item => item.id === id)
        customerService
        .create(customer[0])
        .then(setData(dataDB.concat(customer[0]))) 
    }
    
    return (
    <button 
      className={ `button ${color}` }
      onClick={handleClick}
      disabled={id ? false : true}>
      {text}
    </button>
    )

}

export default CustomButton