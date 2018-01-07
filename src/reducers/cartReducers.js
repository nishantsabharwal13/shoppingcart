export function cartReducers(state= {cart:[]}, action) {
  switch (action.type) {
    case 'GET_CART':
    return {...state,
      cart: action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    }
    break;

    case 'ADD_TO_CART':
    return {...state,
      cart: action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    }
    break;

    case 'UPDATE_CART':
    return {...state,
      cart: action.payload,
      totalAmount: totals(action.payload).amount,
      totalQty: totals(action.payload).qty
    }

    break;

    case 'DELETE_CART_ITEM':
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).qty
      }
      break;
  }
  return state;
}

//calcute totals

export function totals(payloadArr){
  const totalAmount = payloadArr.map(cartArr => cartArr.price * cartArr.quantity).reduce((a,b) =>  a + b,0);
  const totalQty = payloadArr.map(qty => qty.quantity).reduce((a,b) => a+b,0);

  return {
    amount: totalAmount.toFixed(2),
    qty: totalQty
  }
}