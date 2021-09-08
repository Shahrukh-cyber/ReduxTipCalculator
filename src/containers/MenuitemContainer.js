import { connect } from "react-redux"
import MenuItem from "../components/MenuItem"
import { RemoveItem, Updateprice, UpdateQuantity } from "../store/items/actions"
import { selectItemTotal } from "../store/items/selectors"

const mapDispatchToProps = (dispatch, ownProps) => ({
 remove: () => dispatch(RemoveItem(ownProps.uuid)),
 updatePrice: (price) => dispatch(Updateprice(ownProps.uuid, price)),
 updateQuantity: (quantity) => dispatch(UpdateQuantity(ownProps.uuid, quantity))

})
const mapStateToProps = (state, props) => (
 {
  total: selectItemTotal(state, props)
 }
)

export const MenuItemContainer = connect(mapStateToProps, mapDispatchToProps)(MenuItem)