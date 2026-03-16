import { Link } from "react-router-dom";
import type { BookResponse } from "../api";
import styled from "styled-components";
import StarRate from "./StarRate";

const CardDivBook = styled.div`
  width: 400px;
  margin: auto;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 1.3rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    text-shadow: 2px 2px rgba(0, 0, 0, 0.15);
  }
`;

type PropsBook = {
  book: BookResponse;
};

const BookCard = ({ book }: PropsBook) => {
  const reviews = book.reviews || [];

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <div>
      <CardDivBook key={book.id}>
        <StyledLink to={"/bookpage"} state={{ book, avgRating }}>
          {book.title}
        </StyledLink>
        <p>{book.author}</p>
        <img
          src={book.image}
          alt={book.title}
          style={{ width: "200px", height: "300px", borderRadius: "8px" }}
        />
        <StarRate ratingValue={Number(avgRating)} />
      </CardDivBook>
    </div>
  );
};

export default BookCard;
