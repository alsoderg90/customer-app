import customerService from '../services/customer'
import { Store } from 'react-notifications-component';

const CustomButton = ( {selected, dataWeb, dataDB, setDataDB, setDataWeb, color , type, setActive, setSelected }) => {

    const id = selected.id
    const handleClick = () => {

        switch(type) {
            case "Add":
                addCustomer()
                break;
            case "Delete":
                deleteCustomer()
                break
            default:
        }
    }

    function addCustomer() {
        customerService
          .create(selected).then(response => {
              setDataDB(dataDB.concat(selected))
              setDataWeb(dataWeb.filter(item => item.id !== id))
              setActive(-1) 
              setSelected({})
              setNotification("added","success")
          })
          .catch(error => {
            console.log(error)
            setNotification("not added", "danger")
          })
    }

    function deleteCustomer() {
        if (window.confirm("Are You Sure?")) {
            customerService
              .Delete(id).then(response => {
                  setDataDB(dataDB.filter(item =>  item.id !== id))
                  setDataWeb(dataWeb.concat(selected))
                  setActive(-1)
                  setSelected({})
                  setNotification("deleted","success")
              })
              .catch(error => {
                console.log(error)
                setNotification("not deleted", "danger")
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
   
    return (
    <div>
        <button 
        className={ `button ${color}` }
        onClick={handleClick}>
        {type}
        </button>
    </div>
    )
}

export default CustomButton