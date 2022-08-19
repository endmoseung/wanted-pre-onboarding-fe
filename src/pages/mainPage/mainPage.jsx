import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post_signIn } from "../../common/axios";

const Login = () => {
  const [emailState, setEmailState] = useState(false);
  const [passwordState, setPasswordState] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/todo");
  //   }
  // }, []);
  const onChangeEmail = (e) => {
    const inputLen = e.target.value.length;
    if (inputLen > 2) {
      setEmailState(true);
    } else {
      setEmailState(false);
    }
  };

  const onChangePassword = (e) => {
    const inputLen = e.target.value.length;
    if (inputLen > 2) {
      setPasswordState(true);
    } else {
      setPasswordState(false);
    }
  };

  const signIn = async (email, password) => {
    const result = await post_signIn(email, password);
    localStorage.setItem("token", JSON.stringify(result));
    window.location.replace("/");
    navigate("/todo");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signIn(email, password);
  };

  const linkToSignIn = () => {
    navigate("/signin");
  };
  return (
    <Container>
      <MainContainer>
        <MainTitle>
          Todo를 이용하기 위해<br></br> 로그인을 해주세요 🍳{" "}
        </MainTitle>
        <LoginForm onSubmit={handleSubmit}>
          <LoginWrapper>
            <LoginTitle>아이디</LoginTitle>
            <LoginInput
              onChange={onChangeEmail}
              name="email"
              placeholder="naengpa@naengpa.com"
              type={"text"}
            ></LoginInput>
          </LoginWrapper>
          <PasswordWrapper>
            <PasswordTitle>비밀번호</PasswordTitle>
            <PasswordInput
              onChange={onChangePassword}
              name="password"
              placeholder="**********"
              type={"password"}
            ></PasswordInput>
          </PasswordWrapper>
          <LoginButton
            disabled={passwordState && emailState ? false : true}
            passwordState={passwordState}
            emailState={emailState}
          >
            로그인
          </LoginButton>
        </LoginForm>
        <SignInButton onClick={linkToSignIn}>회원가입</SignInButton>
      </MainContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 20px 16px 48px 16px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  input {
    outline: none;
    border: none;
    width: 100%;
    font-weight: 500;
    padding: 13.5px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_30};
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.GREY_30};
    font-weight: 500;
  }
  button {
    cursor: pointer;
  }
`;

const MainContainer = styled.div``;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
`;

const LoginForm = styled.form`
  width: 100%;
  margin-top: 24px;
`;

const LoginWrapper = styled.div``;

const LoginTitle = styled.div`
  font-size: 13px;
`;

const PasswordWrapper = styled.div`
  margin-top: 32px;
`;

const PasswordTitle = styled.div`
  font-size: 13px;
`;

const LoginInput = styled.input`
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
  caret-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;

const SignInButton = styled.button`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.MAIN_COLOR};
  font-size: 16px;
  font-weight: 600;
  padding: 0;
  margin-top: 16px;
`;

const PasswordInput = styled.input`
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
  caret-color: ${({ theme }) => theme.colors.MAIN_COLOR};
`;

const LoginButton = styled.button`
  margin-top: 32px;
  font-weight: 600;
  font-size: 16px;
  color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.WHITE
      : props.theme.colors.GREY_10};

  background-color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  transition: all 300ms ease-in-out;
  padding: 15px 0;
  width: 100%;
  border-radius: 5px;
`;
