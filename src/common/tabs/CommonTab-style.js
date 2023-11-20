import styled from "styled-components";

export const StepperContainer = styled.section`
  position: relative;
  padding: 16px 0;
  margin: 40px 0 0;
`;

export const StepperLine = styled.div`
  /* border: 1px solid #bdbdbd; */
  margin: 0 auto;
  width: 90%;
`;

export const Steps = styled.div`
  display: flex;
`;

export const StepBox = styled.div`
  margin-top: -28px;
  flex-grow: 1;
  text-align: center;
  color: #9e9e9e;

  &.tab-active {
    color: #222222;
  }
`;

export const StepCount = styled.div`
  margin: 0 auto;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 2px solid #cacccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #969696;
  background: #bdbdbd;

  &.tab-active {
    color: #ffffff;
    border: 2px solid #83d0fa;
    /* background-image: -webkit-linear-gradient(
      0deg,
      #884d80 0%,
      #9795f0 0%,
      #2b5876 0%,
      #4e4376 100%
    ); */
    background: #2196f3;
  }

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    font-size: 18px;
  }
`;
export const StepText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight:600;
  margin-top: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;
