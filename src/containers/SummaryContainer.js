import { connect } from "react-redux"
import { Summary } from "../components/Summary";

const mapStateToProps = (state) => {
 const items = state.items;
 let subtotal = 0;
 for (const item of items) {
  subtotal += item.price * item.quantity;
 }
 const tipAmount = subtotal * (state.tipPercentage / 100);
 const total = tipAmount + subtotal
 return {
  subtotal,
  tipAmount,
  total
 }

}
export const SummaryContainer = connect(mapStateToProps)(Summary)