import styled from "styled-components";

export const BoxContainer = styled.div`
  padding: 1.39169rem 4.98688rem 2.30531rem 4.98688rem;
  flex-direction: column;
  align-items: center;
  gap: 21.10725rem;
  width: 30rem;
  height: 25rem;
  background-color: #ccc;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  .header {
    color: var(--Black, #121212);
    text-align: center;
    font-family: Odor Mean Chey;
    font-size: 2.89938rem;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 3.47925rem */
  }
`;

export const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background: var(--Black, #121212);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;
