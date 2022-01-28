const List = ({ data, clickEvent , filter, setActive, activeIndex }) => {
    console.log(data);
    
    const filtered = data.filter(customer => 
        customer.name.toUpperCase().includes(filter)
        )
    
    return(
        <ul className="list-group">
        { filtered.map( (item, i) => {
            return ( 
            <li key={i} 
                onClick={(e) => {
                    setActive(i)
                    clickEvent(item)
                }}
                className={i === activeIndex ? "list-group-item active" : "list-group-item"  }>       
                {item.name} 
            </li>
            )}
        )}
        </ul>
    )
  }

export default List