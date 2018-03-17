import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { ActivityIndicator, FlatList } from 'react-native';

import { getUserInfo } from '../actions/user';

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
  constructor(props) {
    super(props);
    this.state = {
      filterSearch: 'notApproved',
    };

    // this.onFavoritePress = this.favorite.bind(this);
  }

  _renderItem = ({ item }) => <FeedCard {...item} />

  onFavoritePress() {
    console.log(this.state);
  }

  render() {
    const { data } = this.props;
    console.log('data', data);
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
  connect(undefined, { getUserInfo }),
  graphql(GET_TWEETS_QUERY)
)(HomeScreen));
