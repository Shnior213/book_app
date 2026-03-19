import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { login } from "../services/auth.service"; 
import { useUserContext } from "../context/UseUserContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

type FormFields = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { setUser } = useUserContext();

  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormFields>();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (responseData) => {
      setUser({
        userId: responseData.user.id.toString(),
        username: responseData.user.name,
      });
      setValue("email", "");
      setValue("password", "");
      nav("/");
    },
    onError: (err) => {
      setError("root", { message: err.message });
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    loginMutation(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>Login</h3>

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
        {isPending ? "Ooading..." : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default LoginPage;
