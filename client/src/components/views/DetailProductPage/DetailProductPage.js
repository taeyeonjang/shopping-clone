import React, { useEffect, useState } from 'react'
import axios from 'axios'

function DetailProductPage(props) {

    const productId = props.match.params.productId
    
    useEffect(() => {
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if(response.data.success){
                console.log(response.data)
            } else {
                alert('상세정보 가져오는데 실패하였습니다.')
            }
        })
    }, [])
    

  return (
    <div>DetailProductPage</div>
  )
}

export default DetailProductPage