import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';


function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        
    if(props.image.images && props.image.images.length > 0){
        let images = [];
        
            props.image.images.map(item => {
            images.push({
                original: process.env.NODE_ENV === 'development' ? `http://localhost:5100/${item}` : `http://https://aqueous-ravine-65081.herokuapp.com/${item}`,
                thumbnail: process.env.NODE_ENV === 'development' ? `http://localhost:5100/${item}` : `http://https://aqueous-ravine-65081.herokuapp.com/${item}`
            })
        })

        setImages(images)
    }

    }, [props.image])

  return (
    <div>
        <ImageGallery items={Images}/>
    </div>
  )
}

export default ProductImage