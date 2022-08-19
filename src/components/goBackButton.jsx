import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ ...rest }) => {
  const navigate = useNavigate();

  return (
    <Wrapper {...rest}>
      <BackButton icon={faArrowLeft} onClick={() => navigate(-1)}>
        {" "}
      </BackButton>
    </Wrapper>
  );
};

export default GoBackButton;

const Wrapper = styled.div``;

const BackButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 25px;
  margin-bottom: 20px;
  transition: all 150ms ease-in;
  &:hover {
    color: ${({ theme }) => theme.colors.MAIN_COLOR};
  }
`;
