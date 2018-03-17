import { AsyncStorage } from 'react-native';

export const LOGIN = 'LOGIN';

export function login(value) {
  console.log('login', value);
  return {
    type: LOGIN,
  };
}

export function getUserInfo(info) {
  return {
    type: 'GET_USER_INFO',
    info,
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await AsyncStorage.removeItem('@twitteryoutubeclone');

      return dispatch({
        type: 'LOGOUT',
      });
    } catch (error) {
      throw error;
    }
  };
}
