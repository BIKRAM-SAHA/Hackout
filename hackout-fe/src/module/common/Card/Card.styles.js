import styled from 'styled-components';

export const Outer = styled.div`
  display: flex;
  flex-direction: column;
  width: 23rem;
  .card {
    height: 4rem;
    flex-shrink: 0;
    border-radius: ${(props) => props.expandCard ? '0.95356rem 0.95356rem 0rem 0rem' : '0.95356rem 0.95356rem 0.95356rem 0.95356rem'};
    background: #fff;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
    display: flex;
    .leftBorder {
      width: 0.95719rem;
      height: 4rem;
      flex-shrink: 0;
      border-radius: ${(props) => props.expandCard ? '0.95356rem 0rem 0rem 0rem' : '0.95356rem 0rem 0rem 0.95356rem'};
      background: #f48fb1;
    }
    .message {
      flex-shrink: 0;
      color: #f48fb1;
      font-size: 1.3rem;
      font-weight: 400;
      margin-left: 1.5rem;
      margin-top: auto;
      margin-bottom: auto;
    }
    .dropDown {
      margin-top: auto;
      margin-bottom: auto;
      margin-right: 1rem;
      margin-left: auto;
      cursor: pointer;
    }
  }

  .expansionBox {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 2.4375rem;
    border-bottom-right-radius: 2.4375rem;
    padding-bottom: 0.5rem;
    background: #ffcdd2;
    .input-container {
      margin-left: 1rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      width: 17rem;
      height: 2.5rem;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .input-label {
        font-weight: bold;
        color: #C2185B;
        margin-bottom: 0.25rem;
      }
      .custom-input {
        width: 100%;
        height: 100%;
        border: 0.063rem solid #ccc;
        padding: 0.5rem;
        font-size: 1rem;
        box-sizing: border-box;
        outline: none;
        border-radius: 0.75rem;
        background: var(--2-gray, #edeff2);
      }
    }
    .apply-button {
      display: flex;
      width: 6rem;
      height: 1.8rem;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      color: #313131;
      border: none;
      border-radius: 0.625rem;
      cursor: pointer;
      border-radius: 0.35663rem;
      background: #ebedf0;
      margin-left: auto;
      margin-right: auto;
      margin-top: 1rem;
    }
  }
`;
