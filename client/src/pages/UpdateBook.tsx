import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { updateBook } from "../services/book.service";
import AuthBookForm from "../components/AuthBookForm";
import type { FormOutput } from "../schemas/book.schema";

const UpdateBook = () => {
  const location = useLocation();
  const book = location.state;

  const nav = useNavigate();

  const { mutate: updateBookMutation, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateBook(id, data),
    onSuccess: () => {
      nav("/");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  if (!book) return <div>Book not found</div>;

  const handleFormSubmit: SubmitHandler<FormOutput> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    if (data.image) formData.append("image", data.image);

    updateBookMutation({ id: book.id, data: formData });
  };

  return (
    <AuthBookForm
      title="Update Book"
      initialData={book}
      onSubmit={handleFormSubmit}
      isPending={isPending}
    />
  );
};

export default UpdateBook;
