import { useEffect, useState } from "react";
import { getAllBooks, type BookResponse } from "../api";
import { StyledNavLink } from "../styles/StyledNavLink";

function HomePage() {
  const [books, setBooks] = useState<BookResponse[]>();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getAllBooks();
      setBooks(res);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <StyledNavLink to={"/addbook"} style={{ width: "170px" }}>
        Add New Book
      </StyledNavLink>
      {books?.map((book) => (
        <div>
          <div key={book.id}>{book.title}</div>
          
          <img src={book.image} alt={book.title}style={{ width: '200px', borderRadius: '8px'}}/>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
