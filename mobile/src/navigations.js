import React, { Component } from 'react';
import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import styled from './utils/styled';

import HomeScreen from './screens/HomeScreen';

import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';

import { colors } from './utils/constants';

const T = styled.Text``;

const Tabs = TabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        headerTitle: 'Home',
        tabBarIcon: ({ tintColor }) => <T>Home</T>,
      }),
    },
    Explore: {
      screen: ExploreScreen,
      navigationOptions: () => ({
        headerTitle: 'Explore',
        tabBarIcon: ({ tintColor }) => <T>Explore</T>,
      }),
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: () => ({
        headerTitle: 'Notifications',
        tabBarIcon: ({ tintColor }) => <T>Notifications</T>,
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: () => ({
        headerTitle: 'Profile',
        tabBarIcon: ({ tintColor }) => <T>Profile</T>,
      }),
    },
  },
  {
    lazy: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: colors.LIGHT_GRAY,
      style: {
        backgroundColor: colors.WHITE,
        height: 50,
        paddingVertical: 5,
      },
    },
  },
);


const AppMainNav = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
  },
  {
    cardStyle: {
      backgroundColor: '#F1F6FA',
    },
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.SECONDARY,
      },
    }),
  },
);

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSearch: 'notApproved',
    };

    this.onBackPress = this.onBackPress.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.onBackPress());
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.onBackPress());
  }
  onBackPress() {
    // eslint-disable-next-line
    const { dispatch, nav } = this.props;
    console.log('testts');
    if (nav.index === 0) {
      return false;
    }
    // dispatch(NavigationActions.back());
    return true;
  }

  render() {
    // eslint-disable-next-line
    const { dispatch, nav, user } = this.props;
    console.log('dispatch', nav, user);
    const navig = addNavigationHelpers({
      dispatch,
      state: nav,
    });
    if (!user.isAuthenticated) {
      return <AuthenticationScreen />;
    }
    return <AppMainNav navigation={navig} />;
  }
}

export default connect(state => ({
  nav: state.nav,
  user: state.user,
}))(AppNavigator);

export const router = AppMainNav.router;
