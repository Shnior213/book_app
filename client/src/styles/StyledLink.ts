import { Link } from "react-router";
import styled from "styled-components";

export const StyledLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin: 10px;

  &:hover {
    text-shadow: 2px 2px rgba(0, 0, 0, 0.15);
  }
`;
