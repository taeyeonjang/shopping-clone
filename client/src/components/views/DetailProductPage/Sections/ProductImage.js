import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';


function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        
    if(props.image.images && props.image.images.length > 0){
        let images = [];
        
            props.image.images.map(item => {
            images.push({
                original: `http://localhost:5100/${item}`,
                thumbnail: `http://localhost:5100/${item}`
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