// My Imports
import userService from '../services/users'

// Reducer
const userReducer = (state = [], action) => {
  switch(action.type) {

    // Initialize user list from fixed data
    case 'INIT_USERS': {
      return action.data
    }

    // Do nothing otherwise
    default: {
      return state
    }
  }
}

// Action creator function for initializing user list
export const createInitUsersAction = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}


export default userReducer