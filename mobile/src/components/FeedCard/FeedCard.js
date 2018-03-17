import React from 'react';
import PropTypes from 'prop-types';

import styled from '../../utils/styled';

import FeedCardHeader from './FeedCardHeader';
import FeedCardBottom from './FeedCardBottom';

const Root = styled.View`
  min-height: 180;
  background-color: red;
  width: 100%;
  background-color: ${props => props.theme.WHITE};
`;

const MetaContainer = styled.View`
  flex: 1;
  align-self: stretch;
  background-color: blue;
`;

const MetaText = styled.Text`
  font-size: 14;
  text-align: left;
  font-weight: 500;
  color: ${props => props.theme.SECONDARY};
`;

const text = 'lorem ipsumss';

function FeedCard({ onFavoritePress }) {
  const user = {
    username: 'Pascal',
    firstName: 'Lahatra',
    lastName: 'Anjara',
    avatar: null,
  };
  const favoriteCount = 1;
  return (
    <Root>
      <FeedCardHeader {...user} />
      <MetaContainer>
        <MetaText>
          {text}
        </MetaText>
      </MetaContainer>
      <FeedCardBottom
        favoriteCount={favoriteCount}
        onFavoritePress={onFavoritePress}
      />
    </Root>
  );
}

FeedCard.propTypes = {
  // eslint-disable-next-line
  onFavoritePress: PropTypes.func,
};

export default FeedCard;
