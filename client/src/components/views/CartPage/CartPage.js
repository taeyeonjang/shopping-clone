import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import UserCardBlock from './Section/UserCardBlock';
import { Empty } from 'antd';
import Paypal from '../../utils/Paypal';


function CartPage(props) {

  const [Total, setTotal] = useState(0)
  const [ShowTotal, setShowTotal] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    
    let cartItem = [];

    if(props.user.userData && props.user.userData.cart){
      
      if(props.user.userData.cart.length > 0){
        props.user.userData.cart.forEach(item => {
          cartItem.push(item.id)
        })
        dispatch(getCartItems(cartItem, props.user.userData.cart))
        .then(response => { calculateTotal(response.payload) })
      }
    }

  }, [props.user.userData])

  let calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity
    })
    setTotal(total)
    setShowTotal(true)
  }

  let removeFromCart = (productId) => {

      dispatch(removeCartItem(productId))
        .then(response => {
          if(response.payload.productInfo.length <= 0){
            setShowTotal(false)
          }
        })
  }
  
  
  return (
    <div style={{margin:'3rem'}}>
    asdf
    <div>
    <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} />
    </div>

    {ShowTotal ?
        <div style={{ marginTop:'3rem'}}>
          <h2>Total Amount : ${Total}</h2>
        </div>  
        :
        <>
          <br />
          <Empty description={false} />
        </>
      }

      <Paypal />
    </div>

  )
}

export default CartPage
