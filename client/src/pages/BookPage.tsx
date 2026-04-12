import { NavLink, useNavigate, useParams } from "react-router";
import type { BookResponse, ReviewResponse } from "../types/types";
import { deleteBook, getBook, markBookAsRead } from "../services/book.service";
import styled from "styled-components";
import { StyledNavLink } from "../styles/StyledNavLink";
import StarRate from "../components/StarRate";
import { Button } from "../styles/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../context/UseUserContext";

interface ButtonProps {
  bg?: string;
  bgh?: string;
}

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

const StyledButtonSection = styled.div`
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

const StyledButton = styled(Button)<ButtonProps>`
  width: 170px;
  height: 45px;
  background-color: ${(props) => props.bg};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: ${(props) => props.bgh};
  }
`;

const BookPage = () => {
  const { user } = useUserContext();
  const { id } = useParams();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: book,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => getBook(Number(id)),
    queryKey: ["books", id],
    initialData: () => {
      return queryClient
        .getQueryData<BookResponse[]>(["books"])
        ?.find((b) => b.id === Number(id));
    },
  });

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

  const { mutate: deleteBookMutation } = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      console.log("Book deleted duccessfully");
      nav("/");
    },
    onError: (err) => {
      console.error("delete book failed", err);
    },
  });

  if (isPending) return <div>Loading...</div>;

  if (!book || isError) return <div>book not found</div>;

  const handleReadClick = () => {
    markBookAsReadMutation(book.id);
  };

  const isAdminOrSameUser =
    book.addedBy?.id === Number(user?.userId) || user?.isAdmin;

  const reviews = book.reviews || [];

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <StyledDiv>
      <img
        src={book.image}
        alt={book.title}
        style={{ width: "250px", height: "350px", borderRadius: "8px" }}
      />
      <h2> {book.title}</h2>
      <StyledDiv2>
        <StarRate ratingValue={Number(avgRating)} />
        <RatingText>{avgRating} / 5</RatingText>
      </StyledDiv2>
      {book.reviews &&
        book.reviews.map((review: ReviewResponse) => (
          <div key={review.id}>
            {review.content}
            <span style={{ fontSize: "1.1rem", color: "grey" }}>
              {" "}
              Added By
            </span>{" "}
            -{" "}
            <NavLink to="/userprofile" state={review?.user?.id}>
              {review?.user?.name}
            </NavLink>
          </div>
        ))}
      <StyledNavLink to={"/addreview"} state={book.id}>
        Add Review
      </StyledNavLink>
      <StyledButton
        bg="hsl(206.6, 90%, 92%)"
        bgh="hsl(206.6, 90%, 90%)"
        onClick={handleReadClick}
      >
        Add to Read List
      </StyledButton>
      {isAdminOrSameUser && (
        <StyledButtonSection>
          <StyledButton
            bg="hsl(0, 90%, 65%)"
            bgh="hsl(0, 90%, 70%)"
            onClick={() => deleteBookMutation(book.id)}
          >
            Delete
          </StyledButton>
          <StyledButton
            bg=" hsla(207, 100%, 77%, 0.90)"
            bgh="hsla(207, 100%, 77%, 0.50)"
            onClick={() => nav("/updatebook", { state: book })}
          >
            Edit
          </StyledButton>
        </StyledButtonSection>
      )}
    </StyledDiv>
  );
};

export default BookPage;
