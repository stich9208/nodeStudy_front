import React, { useState } from "react";
import styled from "styled-components";

import Input from "../a_atom/Input";

const UserForm = ({ userInfo, isEdit, inputChange }) => {
  return (
    <>
      {Object.keys(userInfo).map((infoTitle) => {
        if (infoTitle !== "_id") {
          return (
            <InfoColumn>
              <InfoTitle>{infoTitle.toUpperCase()}</InfoTitle>
              {isEdit ? (
                <Input
                  name={infoTitle}
                  value={userInfo[infoTitle]}
                  onChange={inputChange}
                />
              ) : (
                <InfoValue>{userInfo[infoTitle]}</InfoValue>
              )}
            </InfoColumn>
          );
        }
      })}
    </>
  );
};

const InfoColumn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InfoTitle = styled.div`
  width: 50%;
  margin-right: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const InfoValue = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  height: 30px;
  font-size: 18px;
`;

export default UserForm;
