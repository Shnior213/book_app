import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { updateBook } from "../services/book.service";
import { useEffect, useState } from "react";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";

type FormFields = {
  title: string;
  author: string;
  image: FileList | null;
};

const UpdateBook = () => {
  const location = useLocation();
  const book = location.state;
  const [preview, setPreview] = useState<string | null>(book.image || null);

  console.log(book);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      title: book.title,
      author: book.author,
      image: null,
    },
  });

  const nav = useNavigate();

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const { mutate: updateBookMutation } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateBook(id, data),
    onSuccess: () => {
      setValue("title", "");
      setValue("author", "");
      setValue("image", null);
      nav("/");
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // const userId = localStorage.getItem("userId");

    const file = data.image?.[0];

    if (!file) {
      alert("Please select an image");
      return;
    }
    console.log("on submit", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    if (data.image && data.image.length > 0) {
      formData.append("image", file);
    }

    updateBookMutation({ id: book.id, data: formData });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add Book</h3>

      <Input
        {...register("title", {
          required: "title is required",
        })}
        type="text"
        placeholder="Title"
      />
      {errors.title && <div>{errors.title.message}</div>}

      <Input
        {...register("author", {
          required: "author is required",
        })}
        type="text"
        placeholder="Author"
      />
      {errors.author && <div>{errors.author.message}</div>}

      <Input type="file" {...register("image")} />
      {errors.image && <div>{errors.image.message}</div>}

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: "100px", margin: "10px 0" }}
        />
      )}
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default UpdateBook;
