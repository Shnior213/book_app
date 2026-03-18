import { useState } from "react";
import { getAllBooks } from "../api";
import { StyledNavLink } from "../styles/StyledNavLink";
import BookCard from "../components/BookCard";
import styled from "styled-components";
import { Input } from "../styles/Input";
import { IoSearch } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";

const ContainerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

const ContainerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const StyledInput = styled(Input)`
  padding: 10px 15px 10px 40px;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  color: #888;
  pointer-events: none;
`;

const StyledBtnNavLink = styled(StyledNavLink)`
  width: 170px;
  background-color: hsl(206.6, 87%, 97%);
  margin: 20px;
  font-size: 1.5rem;
`;

function HomePage() {
  const [searchBook, setSearchBook] = useState<string>("");

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAllBooks(),
    queryKey: ["books"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  //   const filteredBooks = useMemo(() => {
  //   if (!searchBook) return books;
  //   return books.filter(b => b.title.toLowerCase().includes(searchBook.toLowerCase()));
  // }, [books, searchBook]);

  return (
    <>
      <ContainerDiv>
        <StyledBtnNavLink to={"/addbook"}>Add New Book</StyledBtnNavLink>
        <SearchWrapper>
          <IconWrapper>
            <IoSearch />
          </IconWrapper>
          <StyledInput
            type="text"
            name="book-search"
            placeholder="Title ot author"
            value={searchBook}
            onChange={(e) => setSearchBook(e.target.value)}
          />
        </SearchWrapper>
      </ContainerDiv>
      <ContainerGrid>
        {Array.isArray(books) ? (
          books
            ?.filter(
              (b) =>
                !searchBook ||
                b.title
                  .toLowerCase()
                  .includes(searchBook.toLocaleLowerCase()) ||
                b.author.toLowerCase().includes(searchBook.toLocaleLowerCase()),
            )
            .map((b) => <BookCard book={b} key={b.id} />)
        ) : (
          <p>no books found</p>
        )}
      </ContainerGrid>
    </>
  );
}

export default HomePage;
