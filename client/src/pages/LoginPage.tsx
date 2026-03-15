import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { login } from "../api";
import { useUserContext } from "../context/UseUserContext";
import { useNavigate } from "react-router-dom";

type FormFields = {
  // name: string;
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
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const user = await login({ email: data.email, password: data.password });
      setUser({ userId: user.user.id.toString(), username: user.user.name });

      setValue("email", "");
      setValue("password", "");
      nav("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError("root", { message });
    }
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
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Ooading..." : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default LoginPage;
