import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { getUserById } from "../services/user.service";
import styled from "styled-components";
import { StyledLink } from "../styles/StyledLink";

const UserProfileDiv = styled.div`
  width: 500px;
  margin: 10px auto;
  padding: 20px;
  display: flex;
  background-color: aliceblue;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
  border-radius: 8px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserProfile = () => {
  const location = useLocation();
  const userId = location.state;

  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => getUserById(Number(userId)),
    queryKey: ["userData"],
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const totalRating = userData.addedBooks.reduce(
    (i, book) => i + book.reviews.reduce((a, r) => a + r.rating, 0),
    0,
  );

  return (
    <UserProfileDiv>
      <h2>{userData.name}</h2>
      <p>total books rating: <span style={{fontSize: "1.3rem"}}>{totalRating}</span></p>
      <StyledDiv>
        {userData?.addedBooks &&
          userData?.addedBooks.map((book) => <StyledLink to={`/bookpage/${book.id}`}>{book.title}</StyledLink>)}
      </StyledDiv>
    </UserProfileDiv>
  );
};

export default UserProfile;
