import { getUserById } from "../api";
import { useUserContext } from "../context/UseUserContext";
import BookCard from "../components/BookCard";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyBooks = () => {
  const { user } = useUserContext();

  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => getUserById(Number(user?.userId)),
    queryKey: ["userData"],
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

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
