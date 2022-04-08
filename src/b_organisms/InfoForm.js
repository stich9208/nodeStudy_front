import React from "react";
import styled from "styled-components";

//components
import Input from "../a_atom/Input";
import Devider from "../a_atom/Devider";
import TitleText from "../a_atom/TitleText";

const InfoForm = ({ info, isEdit, inputChange }) => {
  return (
    <>
      {Object.keys(info).map((infoTitle, idx) => {
        if (infoTitle !== "_id") {
          return (
            <InfoColumn key={idx}>
              <TitleText>
                <InfoTitle>{infoTitle.toUpperCase()}</InfoTitle>
              </TitleText>

              <InfoValue>
                {isEdit ? (
                  <Input
                    name={infoTitle}
                    value={info[infoTitle]}
                    onChange={inputChange}
                  />
                ) : (
                  info[infoTitle]
                )}
              </InfoValue>
              <Devider />
            </InfoColumn>
          );
        }
      })}
    </>
  );
};

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const InfoTitle = styled.span`
  width: 100%;
`;

const InfoValue = styled.div`
  width: 100%;
  height: 100%;
  margin: 1.5% 2% 1.5% 2%;
  font-size: 15px;
`;

export default InfoForm;
