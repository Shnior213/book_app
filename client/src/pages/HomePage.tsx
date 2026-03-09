import { useEffect, useState } from "react";
import { getAllBooks, type BookResponse } from "../api";
import { StyledNavLink } from "../styles/StyledNavLink";

function HomePage() {
  const [books, setBooks] = useState<BookResponse[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await getAllBooks();
      console.log(res);
      setBooks(res);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <StyledNavLink to={"/addbook"} style={{ width: "170px" }}>
        Add New Book
      </StyledNavLink>
      {Array.isArray(books) ? (
        books?.map((book) => (
          <div key={book.id}>
            <div>{book.title}</div>

            <img
              src={book.image}
              alt={book.title}
              style={{ width: "200px", borderRadius: "8px" }}
            />
          </div>
        ))
      ) : (
        <p>Loading books or no books found</p>
      )}
    </div>
  );
}

export default HomePage;
