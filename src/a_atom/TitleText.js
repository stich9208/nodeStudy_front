import React from "react";
import styled from "styled-components";

const TitleText = ({ children }) => {
  return <Title>{children}</Title>;
};

const Title = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

export default TitleText;
