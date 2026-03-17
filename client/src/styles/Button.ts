import styled from "styled-components";


export const Button = styled.button`
  height: 40px;
  width: 100px;
  cursor: pointer;
  margin: 30px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background-color: hsla(207, 100%, 77%, 0.90);

  &:hover{
    background-color: hsla(207, 100%, 77%, 0.50);
    font-size: 1.1rem;
  }
`
