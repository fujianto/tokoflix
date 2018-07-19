import { combineReducers } from 'redux'
import { Movies } from 'app/reducers/movies'
import { Accounts } from 'app/reducers/accounts'
import { Carts } from 'app/reducers/carts'

const RootReducer = combineReducers({
  Movies,
  Accounts,
  Carts
})

export default RootReducer