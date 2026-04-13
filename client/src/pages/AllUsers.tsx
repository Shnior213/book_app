import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/user.service";
import UserCard from "../components/UserCard";
import styled from "styled-components";

const UsersDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  flex-direction: row;
  margin: 10px;
  gap: 10px;
`;

const AllUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ["users"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <UsersDiv>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </UsersDiv>
  );
};

export default AllUsers;
