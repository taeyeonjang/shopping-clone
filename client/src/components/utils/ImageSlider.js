import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
  
  
  return (
      <div>
    <Carousel autoplay>

        {props.images.map((image, index)=> (
            <div key={index}>
                <img style={{width:'100%', maxHeight:'9rem'}} 
                src={process.env.NODE_ENV === 'development' ? `http://localhost:5100/${image}` : `http://https://aqueous-ravine-65081.herokuapp.com/${image}`} alt="slideImg"/>
            </div>
        ))}
   
  </Carousel>

  </div>
  )
}

export default ImageSlider



 