import React, { Component } from 'react';
import styled from 'styled-components/native';

const Root = styled.View``;

const T = styled.Text``;

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterSearch: 'notApproved',
    };
  }
  render() {
    return (
      <Root>
        <T>Notification</T>
      </Root>
    );
  }
}

export default NotificationsScreen;
