import styled from "styled-components";
import { StyledNavLink } from "../styles/StyledNavLink";

const Header = styled.header`
  /* width: 100%; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: hsl(206.66666666666669, 87.09677419354843%, 93.92156862745098%);
  border-radius: 3px;
  position: sticky;
  top: 0;
`;

const Li = styled.li`
  list-style-type: none;
  font-size: 1.5rem;
  width: 120px;
`;

const Ul = styled.ul`
  display: flex;
  gap: 1rem;
`;

const H1 = styled.h1`
  /* font-size: 1.5rem; */
  height: 50px; /* אותו גובה */
  display: flex;
  align-items: center;
  margin: 0;
`;

const NavBar = () => {
  return (
    <Header>
      <StyledNavLink to={"/"}>
        <H1>Home Page</H1>
      </StyledNavLink>
      <Ul>
        <Li>
          <StyledNavLink to={"/register"}>Register</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to={"/login"}>Login</StyledNavLink>
        </Li>
      </Ul>
    </Header>
  );
};

export default NavBar;
