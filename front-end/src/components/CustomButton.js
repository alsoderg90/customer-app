import customerService from '../services/customer'
import { Store } from 'react-notifications-component';
import { useHistory } from 'react-router-dom';

const CustomButton = ( {selected, dataWeb, dataDB, setDataDB, setDataWeb, type, setSelected, setActive}) => {
    const history = useHistory()

    const id = selected.id
    const handleClick = (e) => {
        e.stopPropagation();
        
        switch(type) {
            case "Add":
                addCustomer()
                break;
            case "Delete":
                deleteCustomer()
                break;
            case "Edit":
                editCustomer()
                break;    
            default:
        }
    }

    const editCustomer = () => {
        customerService
          .Edit(id, selected).then(response => {
              setDataDB(dataDB.map(item => item.id == id ? selected : item))
              setNotification("edited","success")
          })
          .catch(error => {
            console.log(error)
            setNotification("not edited", "danger")
          })
    }

    const addCustomer = () => {
        customerService
          .create(selected).then(response => {
              setDataDB(dataDB.concat(selected))
              setDataWeb(dataWeb.filter(item => item.id !== id))
              setNotification("added","success")
          })
          .catch(error => {
            console.log(error)
            setNotification("not added", "danger")
          })
    }

    const deleteCustomer = () => {
        if (window.confirm("Are You Sure?")) {
            console.log(selected)
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
        history.push('/database')
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
        className={ `button ${type}`}
        onClick={handleClick}
        >
          {type}
        </button>
    </div>
    )
}

export default CustomButton