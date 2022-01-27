const searchField = ({ setFilter }) => {
    const search = (e) => {
        const filter = e.target.value.toUpperCase()
        
        setFilter(filter)
    }

    return (
        <div className="search-field">
            <input  onChange={search} 
              type="text" 
              placeholder="Search.." 
              name="search"
              autoComplete="off">
            </input>
            <button disabled={true}> <i className="fa fa-search"></i> </button>
        </div>
    )
}

export default searchField