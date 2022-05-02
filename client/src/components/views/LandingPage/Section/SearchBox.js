import React, { useState } from 'react'
import { Input } from 'antd';


const { Search } = Input;



function SearchBox(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const searchHandler = (event) => {

        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

  return (
    <div>
    <Search placeholder="input search text" style={{ width: 200 }}
            value={SearchTerm} onChange={searchHandler} />
    </div>
  )
}

export default SearchBox




