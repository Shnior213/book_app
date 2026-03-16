import styled from "styled-components";


export const Input = styled.input`
  width: 250px;
  height: 30px;
  padding: 10px;
  margin: 10px;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: hsl(211, 100%, 50%); /* הצבע הכחול מה-NavLink שלך */
  }
`