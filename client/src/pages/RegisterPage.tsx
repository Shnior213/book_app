import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { registerUser } from "../services/auth.service"; 
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type FormFields = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutate: registerUserMutation, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      nav("/");
    },
    onError: (err) => {
      setError("root", {
        message: err.message || "something went worng",
      });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    registerUserMutation(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Register</h3>
      <Input
        {...register("name", {
          required: "name is required",
        })}
        type="text"
        placeholder="Name"
      />
      {errors.name && <div>{errors.name.message}</div>}
      <Input
        {...register("email", {
          required: "email is required",
          validate: (value) => {
            if (!value.includes("@")) {
              return "Email must include @";
            }
            return true;
          },
        })}
        type="text"
        placeholder="Email"
      />
      {errors.email && <div>{errors.email.message}</div>}
      <Input
        {...register("password", {
          required: "password is required",
          minLength: {
            value: 6,
            message: "Password must have at least 6 characters",
          },
        })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <div>{errors.password.message}</div>}
      <Button disabled={isPending} type="submit">
        {isPending ? "Loading..." : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default RegisterPage;
