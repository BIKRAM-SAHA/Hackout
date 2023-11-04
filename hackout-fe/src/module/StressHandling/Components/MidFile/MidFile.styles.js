import styled from "styled-components";

export const Outer = styled.div`
  display: flex;
  margin-left: 5.5rem;
  margin-right: 5.5rem;
  margin-top: 6rem;
  width: 19.3125rem;
  height: 10.875rem;
  flex-shrink: 0;
  margin-bottom: auto;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5rem;
  /* max-width: 1200px;
  padding: 20px; */
`;