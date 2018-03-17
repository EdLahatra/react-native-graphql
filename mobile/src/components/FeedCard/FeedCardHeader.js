import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { fakeAvatar } from '../../utils/constants';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

const Root = styled.View`
  height: 50;
  flex-direction: row;
  align-items: center;
`;

const AvatarContainer = styled.View`
  flex: 0.2;
  justify-content: center;
  align-self: stretch;
`;

const Avatar = styled.Image`
  height: ${AVATAR_SIZE};
  width: ${AVATAR_SIZE};
  borderRadius: ${AVATAR_RADIUS};
`;

const MetaContainer = styled.View`
  flex: 1;
  align-self: stretch;
`;

const MetaTopContainer = styled.View`
  flex: 1;
  align-self: stretch;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const MetaBottomContainer = styled.View`
  flex: 0.8;
  align-self: stretch;
  align-items: flex-start;
  justify-content: center;
`;

const MetaFullName = styled.Text`
  font-size: 16;
  font-weight: bold;
  color: ${props => props.theme.SECONDARY};
`;

const MetaText = styled.Text`
  font-size: 14;
  font-weight: 600;
  color: ${props => props.theme.LIGHT_GRAY};
`;

function FeedCardHeader({ username, firstName, lastName, avatar }) {
  return (
    <Root>
      <AvatarContainer>
        <Avatar source={{ uri: avatar || fakeAvatar }} />
      </AvatarContainer>
      <MetaContainer>
        <MetaTopContainer>
          <MetaFullName>
            {firstName} {lastName}
          </MetaFullName>
          <MetaText style={{ marginLeft: 5 }}>
            @{username}
          </MetaText>
        </MetaTopContainer>
        <MetaBottomContainer>
          <MetaText>
            {'distanceInWordsToNow(createdAt)'} ago
          </MetaText>
        </MetaBottomContainer>
      </MetaContainer>
    </Root>
  );
}

FeedCardHeader.propTypes = {
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  // eslint-disable-next-line
  avatar: PropTypes.string,
};

export default FeedCardHeader;
