import produce from 'immer';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM_PRICE, UPDATE_ITEM_QUANTITY } from './actions'

let id = 1;

export const initialItems = [
  { uuid: id++, name: 'Tofu Roast', price: 14, quantity: 1 },
  { uuid: id++, name: 'Vegan Ham', price: 12, quantity: 1 }
];

export const reducer = produce((state = initialItems, action) => {
  // if (action.type === ADD_ITEM) {
  //   const item = { uuid: id++, quantity: 1, ...action.payload }
  //   return [...state, item]
  // }
  if (action.type === ADD_ITEM) {
    const item = { uuid: id++, quantity: 1, ...action.payload };
    state.push(item);
  }
  if (action.type === REMOVE_ITEM) {
    debugger;
    return state.filter(item => item.uuid !== action.payload.uuid)
  }
  // if (action.type === UPDATE_ITEM_PRICE) {
  //   return state.map(item => {
  //     if (item.uuid === action.payload.uuid) {
  //       return { ...item, price: action.payload.price }
  //     }
  //     return item;
  //   })

  // } 
  if (action.type === UPDATE_ITEM_PRICE) {
    const item = state.find((item) => item.uuid === action.payload.uuid)
    item.price = parseInt(action.payload.price, 10);



  }
  // if (action.type === UPDATE_ITEM_QUANTITY) {
  //   return state.map(item => {
  //     if (item.uuid === action.payload.uuid) {
  //       return { ...item, quantity: action.payload.quantity }
  //     }
  //     return item;
  //   })
  // }
  if (action.type === UPDATE_ITEM_QUANTITY) {
    const item = state.find(item => item.uuid === action.payload.uuid)
    item.quantity = parseInt(action.payload.quantity, 10)
  }


}, initialItems);

export default reducer;
