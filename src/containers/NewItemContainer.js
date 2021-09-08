import { connect } from "react-redux"
import NewItemForm from "../components/NewItemForm"
import { AddItem } from "../store/items/actions"

const mapDispatchToProps = (dispatch) => ({
 onSubmit: (name, price) => dispatch(AddItem(name, price))

})
export const NewItemContainer = connect(null, mapDispatchToProps)(NewItemForm)