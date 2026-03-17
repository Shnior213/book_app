import { useLocation, useNavigate } from "react-router-dom";
import { markBookAsRead, type ReviewResponse } from "../api";
import styled from "styled-components";
import { StyledNavLink } from "../styles/StyledNavLink";
import StarRate from "../components/StarRate";
import { Button } from "../styles/Button";
import { useMutation } from "@tanstack/react-query";

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

const StyledDiv2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RatingText = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #4a4a4a;
  font-family: sans-serif;
`;

const StyledButton = styled(Button)`
  width: 170px;
  height: 45px;
  background-color: hsl(206.6, 90%, 92%);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: hsl(206.6, 90%, 90%);
  }
`;

const BookPage = () => {
  const location = useLocation();
  const { book, avgRating } = location.state;
  const nav = useNavigate();

  const { mutate: markBookAsReadMutation } = useMutation({
    mutationFn: markBookAsRead,
    onSuccess: (updatedUser) => {
      console.log("updated user data", updatedUser);
      nav("/");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  if (!book) return <div>book not found</div>;

  const handleReadClick = () => {
    markBookAsReadMutation(book.id);
  };

  return (
    <StyledDiv>
      <img
        src={book.image}
        alt={book.title}
        style={{ width: "250px", height: "350px", borderRadius: "8px" }}
      />
      <h2> {book.title}</h2>
      <StyledDiv2>
        <StarRate ratingValue={avgRating} />
        <RatingText>{avgRating} / 5</RatingText>
      </StyledDiv2>
      {book.reviews &&
        book.reviews.map((review: ReviewResponse) => (
          <div key={review.id}>{review.content}</div>
        ))}
      <StyledNavLink to={"/addreview"} state={book.id}>
        Add Review
      </StyledNavLink>
      <StyledButton onClick={handleReadClick}>Add to Read List</StyledButton>
    </StyledDiv>
  );
};

export default BookPage;
