import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Touchable from '@appandflow/touchable';

const Root = styled.View`
  height: 40;
  flex-direction: row;
`;

const Button = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  paddingHorizontal: 32px;
`;

const ButtonText = styled.Text`
  font-size: 14;
  font-weight: 500;
  color: ${props => props.theme.LIGHT_GRAY};
`;

function FeedCardBottom({ favoriteCount, onFavoritePress }) {
  return (
    <Root>
      <Button>
        <ButtonText>
          0
        </ButtonText>
      </Button>
      <Button>
        <ButtonText>
          0
        </ButtonText>
      </Button>
      <Button onPress={onFavoritePress}>
        <ButtonText>
          {favoriteCount}
        </ButtonText>
      </Button>
    </Root>
  );
}

FeedCardBottom.propTypes = {
  favoriteCount: PropTypes.number.isRequired,
  // eslint-disable-next-line
  onFavoritePress: PropTypes.func,
};

export default FeedCardBottom;
