import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Row, Col, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Section/CheckBox';
import { continents, price } from './Section/datas';
import RadioBox from './Section/RadioBox';
import SearchBox from './Section/SearchBox';




function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")


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

    const showFilterResult = (filters) => {
            //여기서는 filters값인 [1, 2]이런걸 이용해서 axios 해주면 대지안을'까?
            //body값을 다시 만들어서 axios로 보내주면댐,!
            
            let body = {
                skip: 0,
                limit: Limit,
                filters: filters
                
            }

            getProducts(body)
            {/*setSkip(0)*/}

    }

    const handlePrice = (value) => {

        const data = price;
        let array = [];

        for (let key in data) {
            if(data[key]._id === parseInt(value, 10)){
            array = data[key].array
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {


        const newFilters = { ...Filters }
            //새로운 Filters State 일단 만든다.

        
           newFilters[category] = filters





           if(category === 'price'){
               let priceValues = handlePrice(filters)
               newFilters[category] = priceValues
           }

           
           
           // handleFilters로 들어온 [1, 2, 3]을 newfilters에 저장 
            //그럼 newfilters에는 Filters에는 init state가 continent 와 price가 있으니깐
            // {continents: Array(2), price: Array(0)} 두개체크했다면 이런식으로

           
            //지금 체크한 그 데이터를 이용해서 axios하기 위해 다른 함수로 또 넘긴다
            // 지금들어가있는 값은 Filters 에 {continents: Array(2), price: Array(0)}
            // 이런게 들어가있음.

           showFilterResult(newFilters)
           setFilters(newFilters)
           

           //

    }

    const refreshFunction = (newSearchTerm) => {
        setSearchTerm(newSearchTerm)
 
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: SearchTerm
            
        }
    
        getProducts(body)

    }

    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <h2 style={{display:'flex', justifyContent:'center'}}>오늘 뭐묵지</h2>

            {/*checkBox*/}
            <Row gutter={[16, 16]}>
                <Col lg={12} >
                    <CheckBox continents={continents} handleFilters={filters => handleFilters(filters, "continents")}/>
                </Col>

                <Col lg={12} xs={24}>
                    <RadioBox price={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>
            
        
        {/* Search */}
        <SearchBox 
            refreshFunction={refreshFunction}
        />




            {/*renderCards*/} 
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

