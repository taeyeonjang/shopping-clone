import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;
 

function CheckBox(props) {

    const [Checked, setChecked] = useState([])
    

    const onCheckBox = (id) => {
        const currentIndex = Checked.indexOf(id)

        const newChecked = [...Checked]

        if(currentIndex === -1) {
            newChecked.push(id)
        } else {
            newChecked.splice(currentIndex, 1)
        }
        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    
   const renderContinents = () => {
       return props.continents && props.continents.map((continent, index) => (
         <Checkbox key={index} 
                onChange={()=> onCheckBox(continent._id)}
                checked={Checked.indexOf(continent._id) === -1 ? false : true }>
                {continent.name}</Checkbox>
       ))
   }


   
  return (
    <div>
        <Collapse style={{width:'50%', marginBottom:'1rem', marginRight:'1rem'}}>
        <Panel header="Continents" key="1">
            {renderContinents()} 
        </Panel>
    </Collapse>
    </div>
  )
}

export default CheckBox

