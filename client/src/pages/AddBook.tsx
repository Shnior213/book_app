import { addBook } from "../services/book.service";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import AuthBookForm from "../components/AuthBookForm";
import type { FormOutput } from "../schemas/book.schema";

const AddBook = () => {
  const nav = useNavigate();

  const { mutate: addBookMutation, isPending } = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      nav("/");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleFormSubmit = (data: FormOutput) => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    console.log("on submit", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    if (data.image) formData.append("image", data.image);

    addBookMutation(formData);
  };

  return (
    <AuthBookForm
      title="Add New Book"
      onSubmit={handleFormSubmit}
      isPending={isPending}
    />
  );
};

export default AddBook;
