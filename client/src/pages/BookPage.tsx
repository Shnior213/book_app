import { useLocation, useNavigate } from "react-router-dom";
import { markBookAsRead, type ReviewResponse } from "../api";
import styled from "styled-components";
import { StyledNavLink } from "../styles/StyledNavLink";
import StarRate from "../components/StarRate";
import { Button } from "../styles/Button";

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 40px auto;
  background-color: hsl(208, 100%, 97.05882352941177%);
  width: 500px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.1);
  font-size: 1.3rem;
`;

const BookPage = () => {
  const location = useLocation();
  const { book, avgRating } = location.state;
  const nav = useNavigate();

  if (!book) return <div>book not found</div>;

  const handleReadClick = async () => {
    try {
      const updatedUser = await markBookAsRead(book.id);
      console.log("updated user data", updatedUser);
    } catch (err) {
      console.error(err);
    } finally {
      nav("/");
    }
  };

  return (
    <StyledDiv>
      <img
        src={book.image}
        alt={book.title}
        style={{ width: "250px", height: "350px", borderRadius: "8px" }}
      />
      <h2> {book.title}</h2>
      <StarRate ratingValue={avgRating} />
      {book.reviews &&
        book.reviews.map((review: ReviewResponse) => (
          <div key={review.id}>{review.content}</div>
        ))}
      <StyledNavLink to={"/addreview"} state={book.id}>
        Add Review
      </StyledNavLink>
      <Button onClick={handleReadClick}>Add to Read List</Button>
    </StyledDiv>
  );
};

export default BookPage;
