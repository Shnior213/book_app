import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { addBook } from "../api";
import { useNavigate } from "react-router-dom";

type FormFields = {
  title: string;
  author: string;
  image: File | null;
};

const AddBook = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const nav = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const userId = localStorage.getItem("userId");

      const file = data.image instanceof FileList ? data.image[0] : data.image;

      if (!file || !userId) {
        alert("Please select an image");
        return;
      }
      console.log("on submit", data);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("image", file);
      // formData.append("userId", userId);

      const res = await addBook(formData);
      console.log(res);

      setValue("title", "");
      setValue("author", "");
      setValue("image", null);
      nav("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      console.log(message);
    }
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

      <Input
        type="file"
        {...register("image", { required: " Image is required" })}
      />
      {errors.image && <div>{errors.image.message}</div>}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default AddBook;
