import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/types";
import { deleteUser } from "../services/user.service";
import { useNavigate } from "react-router";
import styled from "styled-components";

const UserDiv = styled.div`
  width: 100px;
  height: 50px;
  background-color: aliceblue;
  padding: 20px 10px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: auto;
`;

const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: aliceblue;
  border: none;
  border-radius: 8px;
  font-size: 1rem;

  &:hover {
    color: red;
  }
`;

type PropsUser = {
  user: User;
};

const UserCard = ({ user }: PropsUser) => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const { mutate: deleteUserkMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log("User deleted duccessfully");
      nav("/");
    },
    onError: (err) => {
      console.error("delete book failed", err);
    },
  });

  return (
    <UserDiv>
      <StyledButton onClick={() => deleteUserkMutation(user.id)}>
        x
      </StyledButton>
      {user.name}
    </UserDiv>
  );
};

export default UserCard;
