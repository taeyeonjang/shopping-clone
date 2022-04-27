import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Row, Col, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';


function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0);
    
    console.log(PostSize)


    useEffect(() => {
        let body = {
            skip : Skip,
            limit : Limit,
        }

        getProducts(body)
        
    }, [])

    const getProducts = (body) => {

        axios.post('/api/product/products', body)
        .then(response => {
            if(response.data.success){
                if(body.loadMore){
                    console.log(response.data)
                    setProducts([...Products, ...response.data.productInfo])
                } else {
                setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert('db정보를 가져오는데 실패했습니다.')
            }
        })

    }

    const loadMoreButton = () => {
        
        let skip = Skip + Limit
        let body = {
            skip : skip,
            limit : Limit,
            loadMore: true
        }
        
        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index)=> {

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card 
       /*
       <img style={{width:'100%', maxHeight: '150px'}} src={`http://localhost:5100/${product.images[0]}`} alt="coverImg"/>
       */     
    cover={<ImageSlider images={product.images}/>}
    >
            <Meta  
                title={product.title}
                description={`$${product.price}`} />
        </Card>
        </Col>
    })
    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            
        <Row gutter={[16, 16]}>
            {renderCards}
        </Row>
             <br/>
             {PostSize >= Limit &&
             <div style={{display:'flex', justifyContent:'center'}}>
             <Button onClick={loadMoreButton}>더보기</Button>
             </div>}
        

        </div>
    )
}

export default LandingPage

