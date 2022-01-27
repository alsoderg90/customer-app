import { useState } from "react"

const List = ({data, clickEvent}) => {
    const [activeIndex, setActive] = useState(null)
    
    return(
        <ul className="list-group">
        { data.map( (item, i) => {
            console.log(i, activeIndex); 
            return ( 
            <li key={i} 
                onClick={(e) => {
                    setActive(i)
                    clickEvent({ id: item.id, name: item.name }
                )}}
                className={i === activeIndex ? "list-group-item active" : "list-group-item"  }>       
                {item.name} 
            </li>
            )}
        )}
        </ul>
    )
  }

export default List