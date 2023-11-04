import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 23rem;
  .card {
    height: 4rem;
    flex-shrink: 0;
    border-radius: ${(props) =>
      props.expandCard
        ? "0.95356rem 0.95356rem 0rem 0rem"
        : "0.95356rem 0.95356rem 0.95356rem 0.95356rem"};
    background: #fff;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
    display: flex;
    .leftBorder {
      width: 0.95719rem;
      height: 4rem;
      flex-shrink: 0;
      border-radius: ${(props) =>
        props.expandCard
          ? "0.95356rem 0rem 0rem 0rem"
          : "0.95356rem 0rem 0rem 0.95356rem"};
      background: ${(props) => props.broderColor};
    }
    .message {
      flex-shrink: 0;
      color: ${(props) => props.broderColor};
      font-size: 1.3rem;
      font-weight: 400;
      margin-left: 1.5rem;
      margin-top: auto;
      margin-bottom: auto;
    }
    .add {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 1rem;
      margin-left: auto;
      cursor: pointer;
      .icon {
        font-size: 2rem;
        color: ${(props) => props.broderColor};
      }
    }
  }
`;
