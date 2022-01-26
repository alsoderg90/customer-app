import customerService from '../services/customer'

const Button = ({text, value, dataWeb, dataDB, setData}) => {

    const handleClick = () => {
        const customer = dataWeb.filter(item => item.id === value)

        customerService
        .create(customer[0])
        .then(setData(dataDB.concat(customer[0]))) 

    }

    return (
    <button onClick={handleClick}>
        {text}
    </button>
    )

}

export default Button