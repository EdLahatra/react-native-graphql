import React, { Component } from 'react';
import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';
import { Platform, Keyboard, AsyncStorage } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { colors, fakeAvatar } from '../utils/constants';
import SIGNUP_MUTATION from '../graphql/mutations/signup';
import Loading from '../components/Loading';
import { login } from '../actions/user';

const Root = styled(Touchable).attrs({
  feedback: 'none',
})`
  flex: 1;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const BackButton = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
})`
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  z-index: 1;
  left: 5%;
`;

const ButtonConfirm = styled(Touchable).attrs({
  feedback: 'opacity',
})`
  position: absolute;
  bottom: 15%;
  width: 70%;
  height: 50;
  background-color: ${props => props.theme.PRIMARY};
  border-radius: 10;
  justify-content: center;
  align-items: center;
  shadowOpacity: 0.2;
  shadowRadius: 5;
  shadowOffset: 0px 2px;
  elevation: 2;
`;

const ButtonConfirmText = styled.Text`
  color: ${props => props.theme.WHITE};
  font-weight: 600;
`;

const InputWrapper = styled.View`
  height: 50;
  width: 70%;
  border-bottom-width: 2;
  border-bottom-color: ${props => props.theme.LIGHT_GRAY};
  justifyContent: flex-end;
`;

const T = styled.Text``;

const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.LIGHT_GRAY,
  selectionColor: Platform.OS === 'ios' ? colors.PRIMARY : undefined,
  autoCorrect: false,
})`
  height: 30;
  color: ${props => props.theme.WHITE};
`;

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      email: '',
      password: '',
      username: '',
      loading: false,
    };
  }

  static onOutsidePress() {
    Keyboard.dismiss();
  }

  onChangeText(text, type) {
    this.setState({ [type]: text });
  }

  checkIfDisabled() {
    const { fullName, email, password, username } = this.state;
    return (!fullName || !email || !password || !username);
  }

  async onSignupPress() {
    this.setState({ loading: true });

    const { fullName, email, password, username } = this.state;
    const avatar = fakeAvatar;

    try {
      const { data } = await this.props.mutate({
        variables: {
          fullName,
          email,
          password,
          username,
          avatar,
        },
      });
      await AsyncStorage.setItem('@twitteryoutubeclone', data.signup.token);
      this.setState({ loading: false });
      return this.props.login();
    } catch (error) {
      this.setState({ loading: false });
      throw error;
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <Root onPress={() => SignupForm.onOutsidePress()}>
        <BackButton onPress={() => this.props.onBackPress()}>
          <T>onBackPress</T>
        </BackButton>
        <Wrapper>
          <InputWrapper>
            <Input
              placeholder="Full Name"
              autoCapitalize="words"
              onChangeText={text => this.onChangeText(text, 'fullName')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => this.onChangeText(text, 'email')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={text => this.onChangeText(text, 'password')}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={text => this.onChangeText(text, 'username')}
            />
          </InputWrapper>
        </Wrapper>
        <ButtonConfirm
          onPress={() => this.onSignupPress()}
          disabled={this.checkIfDisabled()}
        >
          <ButtonConfirmText>Sign Up</ButtonConfirmText>
        </ButtonConfirm>
      </Root>
    );
  }
}

export default compose(graphql(SIGNUP_MUTATION), connect(undefined, { login }))(
  SignupForm,
);
