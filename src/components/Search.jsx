import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src='search.svg'/>

        <input 
        type="text" 
        value={searchTerm}
        placeholder='Search for thousands of movies'
        onChange={(e)=>{setSearchTerm(e.target.value)}}/>

      </div>
    </div>
  )
}

export default Search
