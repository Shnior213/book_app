import { useState } from "react";
import { getAllBooks } from "../services/book.service";
import { StyledNavLink } from "../styles/StyledNavLink";
import BookCard from "../components/BookCard";
import styled from "styled-components";
import { Input } from "../styles/Input";
import { IoSearch } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../context/UseUserContext";
import { getCategories } from "../services/category.service";

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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 20px;
`;

const StyledSelect = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  min-width: 150px;

  &:focus {
    border-color: #333;
  }
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 0.9rem;
  color: #555;
`;

function HomePage() {
  const { user } = useUserContext();

  const [searchBook, setSearchBook] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getAllBooks(),
    queryKey: ["books"],
  });

  const { data: categories } = useQuery({
    queryFn: () => getCategories(),
    queryKey: ["categories"],
  });

  //   const filteredBooks = useMemo(() => {
  //   if (!searchBook) return books;
  //   return books.filter(b => b.title.toLowerCase().includes(searchBook.toLowerCase()));
  // }, [books, searchBook]);

  const filteredBooks = books?.filter((b) => {
    const matchesCategory = selectedCategoryId
      ? b.categories?.some((c) => c.id === selectedCategoryId)
      : true;

    const matchesSearch =
      b.title.toLowerCase().includes(searchBook.toLowerCase()) ||
      b.author.toLowerCase().includes(searchBook.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  if (!books) {
    return <div>no found books</div>;
  }

  return (
    <>
      <ContainerDiv>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StyledBtnNavLink to={"/addbook"}>Add New Book</StyledBtnNavLink>
          {user?.isAdmin && (
            <StyledBtnNavLink to={"/addcategory"}>
              Add Category
            </StyledBtnNavLink>
          )}
        </div>
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
        <FilterContainer>
          <Label>Filter:</Label>
          <StyledSelect
            value={selectedCategoryId || ""}
            onChange={(e) => {
              const val = e.target.value;
              setSelectedCategoryId(val === "" ? null : Number(val));
            }}
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </StyledSelect>
        </FilterContainer>
      </ContainerDiv>
      <ContainerGrid>
        {filteredBooks?.length ? (
          filteredBooks.map((b) => <BookCard book={b} key={b.id} />)
        ) : (
          <p>no books match your search</p>
        )}
      </ContainerGrid>
    </>
  );
}

export default HomePage;
