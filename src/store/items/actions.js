export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_ITEM_PRICE = 'UPDATE_ITEM_PRICE'
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'


export const AddItem = (name, price) => {
 return {
  type: ADD_ITEM,
  payload: { name, price }
 }
}
export const RemoveItem = (uuid) => {
 return {
  type: REMOVE_ITEM,
  payload: { uuid },
 }
}
export const Updateprice = (uuid, price) => {
 return {
  type: UPDATE_ITEM_PRICE,
  payload: { uuid, price }
 }
}
export const UpdateQuantity = (uuid, quantity) => {
 return {
  type: UPDATE_ITEM_QUANTITY,
  payload: { uuid, quantity }
 }
}
