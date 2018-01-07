import axios from 'axios';

export function getCart() {
  return function(dispatch) {
    axios.get('/api/cart')
      .then(res => {
        dispatch({ type: "GET_CART", payload: res.data })
      })
      .catch(err => {
        dispatch({ type: "GET_CART_REJECTED", payload: "there was error getting cart" })
      });
  }
}

export function addToCart(cart) {
  return function(dispatch) {
    axios.post('/api/cart', cart)
      .then(res => {
        dispatch({ type: "ADD_TO_CART", payload: res.data })
      })
      .catch(err => {
        dispatch({ type: "ADD_TO_CART_REJECTED", payload: "there was error adding cart" })
      });
  }
}

export function updateCart(_id, unit, cart) {
  const currentBookToUpdate = cart;
  const indexToUpdate = currentBookToUpdate.findIndex((cart) => cart._id === _id);
  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }

  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];

  return function (dispatch) {
    axios.post('/api/cart', cartUpdate)
      .then(res => {
        dispatch({ type: "UPDATE_CART", payload: res.data })
      })
      .catch(err => {
        dispatch({ type: "UPDATE_CART_REJECTED", payload: "there was error updating cart" })
      });
  }
  
  // return {
  //   type: "UPDATE_CART",
  //   payload: cartUpdate,
  // }
}

export function deleteCartItem(cart) {

  return function (dispatch) {
    axios.post('/api/cart', cart)
      .then(res => {
        dispatch({ type: "DELETE_CART_ITEM", payload: res.data })
      })
      .catch(err => {
        dispatch({ type: "DELETE_CART_ITEM_REJECTED", payload: "there was error deleting cart" })
      });
  }
  // return {
  //   type: "DELETE_CART_ITEM",
  //   payload: cart
  // }
}
