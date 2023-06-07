import styled from "@emotion/styled";

export const StyledMain = styled("main")`
  display: flex;

  @media (max-width: 1199px) {
    justify-content: center;
    align-items: center;
  }
`;

export const StyledImageContainer = styled.div`
  max-width: 50%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
