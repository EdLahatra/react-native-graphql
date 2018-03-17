import React, { Component } from 'react';

import styled from '../utils/styled';

import FeedCard from '../components/FeedCard/FeedCard';

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

    this.onFavoritePress = this.favorite.bind(this);
  }

  onFavoritePress() {
    console.log(this.state);
  }

  render() {
    return (
      <Root>
        <ScrollView>
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
          <FeedCard onFavoritePress={this.onFavoritePress} />
        </ScrollView>
      </Root>
    );
  }
}

export default HomeScreen;
