import React, { useState } from 'react'
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

    let formData = new FormData();
    
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
        .then(response => {
            if(response.data.success){
                setImages([...Images, response.data.filePath] )
                props.refreshFunction([...Images, response.data.filePath] )
            } else {
                alert('파일정보를 서버에서 받는데 실패하였습니다.')
            }
        })
        
    }
    
    const deleteHandler = (image) => {
        let currentIndex = Images.indexOf(image)


        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        
        setImages(newImages)

        props.refreshFunction(newImages)
    }

  return (
    <div style={{ display:'flex', justifyContent:'space-between'}}>
        <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (

                <div style={{ width:'300px', height:'240px', border: '1px solid lightgray',
                              display:'flex', alignItems:'center', justifyContent:'center'}}
                           {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{ fontSize: '3rem' }} />
                </div>
            )}
        </Dropzone>

        <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {Images.map((image, index)=> (
                    <div onClick={()=>deleteHandler(image)}key={index}>
                    <img style={{ minWidth:'300px', width:'300px', height:'240px'}} src={process.env.NODE_ENV === 'development' ? `http://localhost:5100/${image}` : `http://https://aqueous-ravine-65081.herokuapp.com/${image}`} alt="uploadImg"/>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default FileUpload

