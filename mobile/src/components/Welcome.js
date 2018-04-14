import React from 'react';
import styled from '../utils/styled';

const Root = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${props => props.theme.WHITE};
  width: 90%;
  align-self: center;
`;

const Text = styled.Text`
  color: ${props => props.theme.PRIMARY};
  font-size: 18;
  text-align: center;
`;

export default function Welcome() {
  return (
    <Root>
      <Text>Welcome, if you see this that mean everything work!!!</Text>
    </Root>
  );
}
