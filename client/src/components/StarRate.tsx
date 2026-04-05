import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";

type Props = {
  ratingValue: number;
};

const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 20px;
`;

const StarRate = ({ ratingValue }: Props) => {
  
  return (
    <StarsContainer>
      {[...Array(5)].map((_, index) => {
        const i = index + 1;

        return (
          <span key={index}>
            {ratingValue >= i ? (
              <FaStar size={25} color="#ffc107" />
            ) : ratingValue >= i - 0.5 ? (
              <FaStarHalfAlt size={25} color="#ffc107" />
            ) : (
              <FaRegStar size={25} color="#ffc107" />
            )}
          </span>
        );
      })}
      {/* <RatingText>{ratingValue} / 5</RatingText> */}
    </StarsContainer>
  );
};

export default StarRate;
