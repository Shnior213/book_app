import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
// import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import {
  useMutation /* , useQueryClient */,
  useQueryClient,
} from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categirySchema,
  type CategiryFormfileds,
} from "../schemas/categiry.schema";
import { addCategory } from "../services/category.service";
import toast from "react-hot-toast";

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CategiryFormfileds>({
    resolver: zodResolver(categirySchema),
  });

  const queryClient = useQueryClient();
  // const location = useLocation();
  // const bookId = location.state;
  const nav = useNavigate();

  const { mutate: addCategoryMutation } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      toast.success("Category added successfully!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setValue("name", "");
      nav(-1);
    },
    onError: (err) => {
      console.error(err);
      setError("root", { message: err.message || "something went wrong" });
    },
  });

  const onSubmit: SubmitHandler<CategiryFormfileds> = (data) => {
    addCategoryMutation(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Add Review</h3>

      <Input {...register("name")} type="text" placeholder="Name" />
      {errors.name && <div>{errors.name.message}</div>}

      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default AddCategory;
