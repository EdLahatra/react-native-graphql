import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';

import { store, client } from './src/store';
import { colors } from './src/utils/constants';

import { login } from './src/actions/user';

import AppNavigation from './src/navigations';
import Loading from './src/components/Loading';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
    };
  }

  componentWillMount() {
    this.checkIfToken();
  }

  async checkIfToken() {
    try {
      const token = await AsyncStorage.getItem('@twitteryoutubeclone');
      if (token != null) {
        store.dispatch(login());
      }
    } catch (error) {
      throw error;
    }

    this.setState({ appIsReady: true });
  }

  render() {
    if (!this.state.appIsReady) {
      return <Loading />;
    }
    return (
      <ApolloProvider store={store} client={client}>
        <ThemeProvider theme={colors}>
          <AppNavigation />
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
