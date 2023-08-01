import { ADD_TO_CART,REMOVE_FROM_CART } from './constants';
const initialState =[];
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return [
          ...state,
          action.data
        ];
        case REMOVE_FROM_CART:
          return state.filter(item => item.name !== action.data);
          
        
      default:
        return state;
    }
  };
  
  export default reducer;