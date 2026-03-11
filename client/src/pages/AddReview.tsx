import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { addReview } from "../api";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type FormFields = {
  rating: number;
  content: string;
};

const AddReview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const location = useLocation();
  const bookId = location.state;
  const nav = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId || !bookId) {
        return;
      }
      console.log("on submit", data);

      const payload = {
        rating: Number(data.rating),
        content: data.content,
        bookId: bookId,
      };

      const res = await addReview(payload);
      console.log(res);

      setValue("rating", 0);
      setValue("content", "");
      nav(-1);
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
        {...register("rating", {
          required: "rating is required",
        })}
        type="number"
        min={0}
        max={5}
        placeholder="Rating"
      />
      {errors.rating && <div>{errors.rating.message}</div>}

      <Input {...register("content")} type="text" placeholder="Content" />
      {errors.content && <div>{errors.content.message}</div>}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default AddReview;
