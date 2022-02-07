import React from 'react'
import { useHistory } from 'react-router-dom'

const List = ( props ) => {
    const history = useHistory()
    
    const filtered = props.data.filter(customer => 
        customer.name.toUpperCase().includes(props.filter)
        )
    
    return(
        <ul className="list-group customList">
        { filtered.map( (item, i) => {
            return ( 
            <li key={i} 
                onClick={(e) => {
                    props.setActive(i)
                    props.setSelected(item)
                    props.setCopy(item)
                    {props.redirect ? history.push("/customer") : history.push(0)}
                }}
                className={i === props.activeIndex ? "list-group-item active" : "list-group-item"  }>       
                {item.name}
                {React.cloneElement(props.children, {selected: item})} 
            </li>
            )}
        )}
        </ul>
    )
  }

export default List