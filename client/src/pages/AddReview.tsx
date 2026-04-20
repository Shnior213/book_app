import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { addReview } from "../services/review.service";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewSchema, type ReviewFormfileds } from "../schemas/review.schmea";
import { zodResolver } from "@hookform/resolvers/zod";

const AddReview = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormfileds>({
    resolver: zodResolver(reviewSchema),
  });

  const queryClient = useQueryClient();
  const location = useLocation();
  const bookId = location.state;
  const nav = useNavigate();

  const { mutate: addReviewMutation } = useMutation({
    mutationFn: addReview,
    onSuccess: (data) => {
      console.log("Review added ", data);
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setValue("rating", 0);
      setValue("content", "");
      nav(-1);
    },
    onError: (err) => {
      console.error(err);
      setError("root", { message: err.message || "something went worng" });
    },
  });

  const onSubmit: SubmitHandler<ReviewFormfileds> = (data) => {
    const userId = localStorage.getItem("userId");

    if (!userId || !bookId) {
      console.log("Missing userId or bookId");
      return;
    }

    const payload = {
      rating: Number(data.rating),
      content: data.content,
      bookId: bookId,
    };

    addReviewMutation(payload);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add Review</h3>

      <Input {...register("rating")} type="number" placeholder="Rating" />
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
