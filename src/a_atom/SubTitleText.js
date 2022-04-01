import React from "react";
import styled from "styled-components";

const SubTitleText = ({ children }) => {
  return <SubTitle>{children}</SubTitle>;
};

const SubTitle = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: grey;
`;

export default SubTitleText;
