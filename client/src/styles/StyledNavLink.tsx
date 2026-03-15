import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 170px;
  color: hsl(211, 100%, 50%);
  text-decoration: none;
  font-weight: bold;
  padding: 8px 12px;
  margin: auto 0;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    /* background-color: hsl(0, 1%, 87.5%); */
    text-shadow: 2px 2px hsla(230, 100%, 50%, 0.2);
    color: hsl(220, 100%, 50%);
  }

  &.active {
    /* background-color: hsl(0, 1%, 90%); */
    text-shadow: 3px 3px hsla(230, 100%, 50%, 0.3);
    color: hsl(230, 100%, 50%);
  }
`;