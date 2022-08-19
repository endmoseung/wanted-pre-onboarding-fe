import React, { useState } from "react";
import styled from "styled-components";
import { post_signUp } from "../../common/axios";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../components/goBackButton";

const SignIn = () => {
  const [passwordState, setPasswordState] = useState();
  const [emailState, setEmailState] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    (async () => {
      let promise = new Promise((resolve, reject) => {
        resolve(post_signUp(email, password));
      });
      let result = await promise;
      navigate("/");
      console.log(result);
    })();
  };

  const onChangeEmail = (e) => {
    if (e.target.value.includes("@")) {
      setEmailState(true);
    } else {
      setEmailState(false);
    }
  };

  const onChangePassword = (e) => {
    const inputLen = e.target.value.length;
    if (inputLen > 7) {
      setPasswordState(true);
    } else {
      setPasswordState(false);
    }
  };

  return (
    <SignInContainer>
      <GoBackButton></GoBackButton>
      <MainTitle>회원가입</MainTitle>
      <SignInForm onSubmit={handleSubmit}>
        <InputEmailWrapper>
          <InputEmailTitle>이메일</InputEmailTitle>
          <InputEmail onChange={onChangeEmail} type={"text"}></InputEmail>
        </InputEmailWrapper>
        <InputPasswordWrapper>
          <InputPasswordTitle>비밀번호</InputPasswordTitle>
          <InputPassword
            onChange={onChangePassword}
            type={"password"}
          ></InputPassword>
        </InputPasswordWrapper>
        <SignInButton
          disabled={passwordState && emailState ? false : true}
          passwordState={passwordState}
          emailState={emailState}
        >
          회원가입
        </SignInButton>
      </SignInForm>
    </SignInContainer>
  );
};

export default SignIn;
const SignInContainer = styled.div`
  padding: 16px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    outline: none;
    width: 100%;
    font-weight: 500;
    padding: 13.5px 0;
  }
  input::placeholder {
    color: ${({ theme }) => theme.colors.GREY_30};
    font-weight: 500;
  }
`;

const MainTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const SignInForm = styled.form`
  margin-top: 30px;
`;

const InputEmailWrapper = styled.div``;

const InputEmailTitle = styled.div``;

const InputEmail = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_30};
  margin-bottom: 32px;
  transition: all 300ms ease-in-out;
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
`;

const InputPasswordWrapper = styled.div``;

const InputPasswordTitle = styled.div``;

const InputPassword = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GREY_30};
  margin-bottom: 32px;
  transition: all 300ms ease-in-out;
  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.colors.MAIN_COLOR};
  }
`;

const SignInButton = styled.button`
  text-align: center;
  margin-top: 32px;
  font-weight: 600;
  padding: 15px 0;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.WHITE
      : props.theme.colors.GREY_10};

  background-color: ${(props) =>
    props.passwordState && props.emailState
      ? props.theme.colors.MAIN_COLOR
      : props.theme.colors.GREY_30};
  transition: all 300ms ease-in-out;
`;
