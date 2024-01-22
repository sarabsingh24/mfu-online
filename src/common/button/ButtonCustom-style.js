import styled from "styled-components";

export const BtnStyle = styled.button`
  border-radius: 50%;
  height: 32px;
  width: 32px;
  /* background-color: ${(props) => (props.bgColor ? "#388e3c" : "#0288d1")}; */
  background-color: ${(props) => (props.bgColor ? "#388e3c" : "#fff")};
  border: 1px solid ${(props) => (props.bgColor ? "#66bb6a" : "#29b6f6")};
  /* padding: 18px ; */
  font-size: 14px;
  font-weight: 600;
  color: #0288d1;
  line-height: 16px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  /* display: flex; */
  cursor: pointer;

  @media (max-width: 768px) {
    /* flex-grow: 1; */
    text-align: center;
  }
`;

export const BtnSubmitStyle = styled.button`
  border-radius: 6px;
  height: 32px;
  width: auto;
  /* background-color: ${(props) => (props.bgColor ? '#388e3c' : '#0288d1')}; */
  background-color: ${(props) => (props.bgColor ? '#388e3c' : '#fff')};
  border: 1px solid ${(props) => (props.bgColor ? '#66bb6a' : '#29b6f6')};
  /* padding: 18px ; */
  font-size: 14px;
  font-weight: 600;
  color: #0288d1;
  line-height: 16px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  /* display: flex; */
  cursor: pointer;

  @media (max-width: 768px) {
    /* flex-grow: 1; */
    text-align: center;
  }
`;

export const BtnTextStyle = styled.button`
 border-radius:4px;
  height: 32px;
  
  /* background-color: ${(props) => (props.bgColor ? '#388e3c' : '#0288d1')}; */
  background-color: ${(props) => (props.bgColor ? '#388e3c' : '#fff')};
  border: 1px solid ${(props) => (props.bgColor ? '#66bb6a' : '#29b6f6')};
  /* padding: 18px ; */
  font-size: 14px;
  font-weight: 600;
  color: #0288d1;
  line-height: 16px;
  margin: 0 4px;
  justify-content: center;
  align-items: center;
  /* display: flex; */
  cursor: pointer;

  @media (max-width: 768px) {
    /* flex-grow: 1; */
    text-align: center;
  }
`;


