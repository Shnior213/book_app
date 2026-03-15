import styled from "styled-components";
import { StyledNavLink } from "../styles/StyledNavLink";
import { useUserContext } from "../context/UseUserContext";
import { logout } from "../api";
import { useNavigate } from "react-router-dom";

const Header = styled.header`
  /* width: 100%; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 100px;
  background-color: hsl(206.6, 87%, 93.9%);
  border-radius: 3px;
  position: sticky;
  top: 0;
`;

const Li = styled.li`
  list-style-type: none;
  font-size: 1.5rem;
  width: 120px;
  margin: 10px;
`;

const Ul = styled.ul`
  display: flex;
  align-items: center;
  gap: 3rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const H1 = styled.h1`
  /* font-size: 1.5rem; */
  height: 50px;
  display: flex;
  align-items: center;
  margin: 0;
`;

const LogoutButton = styled.button`
  height: 40px;
  width: 100px;
  cursor: pointer;
  margin: 0;
  color: hsl(211, 100%, 50%);
  font-size: 1.5rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  border-radius: 8px;

  &:hover {
    color: black;
  }
`;

const NavBar = () => {
  const { user, setUser } = useUserContext();
  // console.log(user);
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    console.log("user logout", user);
    setUser(undefined);
    nav("/");
  };

  return (
    <Header>
      <StyledNavLink to={"/"}>
        <H1>Home Page</H1>
      </StyledNavLink>

      {user ? (
        <Ul>
          <Li>
            <StyledNavLink to={"/mybooks"}>Books I Read</StyledNavLink>
          </Li>
          <Li>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </Li>
        </Ul>
      ) : (
        <Ul>
          <Li>
            <StyledNavLink to={"/register"}>Register</StyledNavLink>
          </Li>
          <Li>
            <StyledNavLink to={"/login"}>Login</StyledNavLink>
          </Li>
        </Ul>
      )}
    </Header>
  );
};

export default NavBar;
