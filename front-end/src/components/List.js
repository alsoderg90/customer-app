const List = ({data, clickEvent}) => {

    return(
        <ul>
        { data.map(item => {
            return <li key={item.id} onClick={(event) => {
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