import styled from "styled-components";

export const StyledDialog = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 100;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000038;
`;
