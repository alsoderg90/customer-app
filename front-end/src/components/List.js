import { useState } from "react"

const List = ({data, clickEvent , filter}) => {
    const [activeIndex, setActive] = useState(null)
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