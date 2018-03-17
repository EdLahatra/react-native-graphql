import { LOGIN } from '../actions/user';

const initialState = {
  isAuthenticated: false,
  info: null,
};

export default (state = initialState, action) => {
  console.log('xddd', action);
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case 'GET_USER_INFO':
      return {
        ...state,
        info: action.info,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};