const Button = ({text, value, data}) => {

    const handleClick = () => {
        const as = data.filter(item => item.id === value)
        console.log(as)
    }

    return (
    <button onClick={handleClick}>
        {text}
    </button>
    )

}

export default Button