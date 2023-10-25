import styled from '@emotion/styled'
export {default} from "./MainLayout"
export const BackToTop = styled.div`
  color: #d4dd29;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    color: #ffb8b8;
  }
`;