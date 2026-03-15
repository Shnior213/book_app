import { useEffect, useState } from "react";
import { getAllBooks, type BookResponse } from "../api";
import { StyledNavLink } from "../styles/StyledNavLink";
import BookCard from "../components/BookCard";
import styled from "styled-components";

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

function HomePage() {
  const [books, setBooks] = useState<BookResponse[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getAllBooks();
      setBooks(res);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <StyledNavLink
        to={"/addbook"}
        style={{
          width: "170px",
          backgroundColor: "hsl(0, 1%, 95%)",
          margin: "20px",
          fontSize: "1.5rem",
        }}
      >
        Add New Book
      </StyledNavLink>
      <ContainerGrid>
        {Array.isArray(books) ? (
          books?.map((book) => <BookCard book={book} key={book.id} />)
        ) : (
          <p>Loading books or no books found</p>
        )}
      </ContainerGrid>
    </div>
  );
}

export default HomePage;
