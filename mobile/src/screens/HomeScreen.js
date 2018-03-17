import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { BackHandler, ActivityIndicator, FlatList } from 'react-native';

import { getUserInfo } from '../actions/user';

import TWEET_ADDED_SUBSCRIPTION from '../graphql/subscriptions/tweetAdded';

import styled from '../utils/styled';

import FeedCard from '../components/FeedCard/FeedCard';
import GET_TWEETS_QUERY from '../graphql/queries/getTweets';
import ME_QUERY from '../graphql/queries/me';

const Root = styled.View`
  background-color: #f2f2f2;
  flex: 1;
  padding-top: 10;
  justify-content: center;
`;

const ScrollView = styled.ScrollView`

`;

// const T = styled.Text``;

class HomeScreen extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: TWEET_ADDED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newTweet = subscriptionData.data.tweetAdded;

        if (!prev.getTweets.find(t => t._id === newTweet._id)) {
          return {
            ...prev,
            getTweets: [{ ...newTweet }, ...prev.getTweets]
          }
        }

        return prev;
      }
    });

    BackHandler.addEventListener('hardwareButtonPress', () => this._backButtonPress());
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareButtonPress');
  }

  _backButtonPress() {
    const { dispatch, navigation, nav, user } = this.props;
    if (2<1) {
      return false;
    }
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidMount() {
    this._getUserInfo();
  }

  _getUserInfo = async () => {
    const { data: { me } } = await this.props.client.query({ query: ME_QUERY });
    this.props.getUserInfo(me);
  }

  _renderItem = ({ item }) => <FeedCard {...item} />

  onFavoritePress() {
    console.log(this.state);
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return (
        <Root>
          <ActivityIndicator size="large" />
        </Root>
      )
    }

    return (
      <Root>
        <ScrollView>
          <FlatList
            contentContainerStyle={{ alignSelf: 'stretch' }}
            data={data.getTweets}
            keyExtractor={item => item._id}
            renderItem={this._renderItem}
          />
        </ScrollView>
      </Root>
    );
  }
}

export default withApollo(compose(
  connect(state => ({
    nav: state.nav,
    user: state.user,
  }), { getUserInfo }),
  graphql(GET_TWEETS_QUERY)
)(HomeScreen));
