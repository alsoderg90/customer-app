const List = ({data, clickEvent}) => {

    return(
        <ul>
        { data.map( (item, i) => {
            return <li key={i} onClick={(event) => {
                clickEvent({
                    id: item.id,
                    name: item.name
                    })
                }}> 
                {item.name} </li>
            }
        )}
        </ul>
    )
  }

export default List