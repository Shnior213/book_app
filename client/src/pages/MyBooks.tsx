import { useEffect, useState } from "react";
import { getUserById, type User } from "../api";
import { useUserContext } from "../context/UseUserContext";
import BookCard from "../components/BookCard";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyBooks = () => {
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchUser = async () => {
      if (user && user.userId) {
        try {
          const res = await getUserById(Number(user.userId));
          setUserData(res);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchUser();
  }, [user]);

  return (
    <StyledDiv>
      {userData?.readBooks &&
        userData?.readBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
    </StyledDiv>
  );
};

export default MyBooks;
