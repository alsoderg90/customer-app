import customerService from '../services/customer'
import { Store } from 'react-notifications-component';

const CustomButton = ( {text, selected, dataWeb, dataDB, setDataDB, setDataWeb, color , type, setActive, setSelected }) => {

    const id = selected.id
    const handleClick = () => {

        switch(type) {
            case "add":
                addCustomer()
                break;
            case "delete":
                deleteCustomer()
                break
            default:
        }
    }

    function addCustomer() {
        customerService
          .create(selected).then(response => {
              console.log(response)
              setDataDB(dataDB.concat(selected))
              setDataWeb(dataWeb.filter(item => item.id !== id))
              setActive(-1) 
  
              setNotification("added","success")
          })
          .catch(error => {
            console.log(error)
            setNotification("not deleted!", "danger")
          })
    }

    function deleteCustomer() {
        if (window.confirm("Are You Sure?")) {
            console.log(selected)
            customerService
              .Delete(id).then(response => {
                  console.log(response)
                  setDataDB(dataDB.filter(item =>  item.id !== id))
                  setDataWeb(dataWeb.concat(selected))
                  setActive(-1)
                  setSelected({})
                  setNotification("deleted","success")
              })
              .catch(error => {
                console.log(error)
                setNotification("not deleted!", "danger")
              })           
        }
    }

    function setNotification(title, type) {
        Store.addNotification({
            title: `${selected.name} ${title} !`,
            type: type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 700,
              pauseOnHover: true,
              onScreen: true
            }
        })
    }

    const style = {
        borderBottom: "2px solid orange"
    }

    const none = {
        boder: "0px"
    }
    
    return (
    <div>
        <button 
        className={ `button ${color}` }
        onClick={handleClick}
        disabled={id ? false : true}>
        {text}
        </button>
        {selected.name}
    </div>
    )
}

export default CustomButton