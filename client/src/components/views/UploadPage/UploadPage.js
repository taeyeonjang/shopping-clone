import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import './UploadPage.css'; 
import Axios from 'axios';


const { TextArea } = Input;

const Continents = [
  {key:1, value:"Africa"},
  {key:2, value:"Europe"},
  {key:3, value:"Asia"},
  {key:4, value:"North America"},
  {key:5, value:"South America"},
  {key:6, value:"Australia"},
  {key:7, value:"Antarctica"},
]

function UploadPage(props) {

  const [Title, setTitle] = useState("");
  const [Des, setDes] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1)
  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitle(event.currentTarget.value)
  }
  
  const onDesChange = (event) => {
    setDes(event.currentTarget.value)
  }

  const onPrice = (event) => {
    setPrice(event.currentTarget.value)
  }

  const onContinent = (event) => {
    setContinent(event.currentTarget.value)
  }

  const onSumbit = () => {
      if(!Title || !Des || !Price || !Continent || !Images){
      return alert(' 모두 작성해주세요!')
      }

      const body = {
        writer: props.user.userData._id,
        title: Title,
        description: Des,
        price: Price,
        images: Images,
        continents: Continent
      }

      Axios.post("/api/product/save", body)
      .then(response => {
        if(response.data.success){
          alert('upload 성공')
          props.history.push('/')
        } else {
          alert('upload 에러')
        }
      })
  }

  const updateImages = (newImage) => {
    setImages(newImage)
  }
  

  return (
    <div className="div" >
      <h2 level={2} className="title">Upload Travel Product</h2>

      <Form onSubmitCapture={onSumbit}>

      <FileUpload refreshFunction={updateImages} />


        <label>Title<br/>
        <Input onChange={onTitleChange} value={Title} className="input__Title"></Input>
        </label> 

        <label>Description<br/>
        <TextArea onChange={onDesChange} value={Des} className="input__Description" type='text'></TextArea>
        </label>

        <label>Price($)<br/>
        <Input onChange={onPrice} value={Price} className="input__price"></Input>
        </label>

        

        <select onChange={onContinent} value={Continent}>
        {Continents.map((item)=> (
          <option key={item.key} value={item.key}> {item.value}</option>
  ))}
        </select>

        <Button htmlType="submit" type='primary'>Submit</Button>


      </Form>

    </div>
  )
}

export default UploadPage