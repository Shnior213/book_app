import { useForm, type SubmitHandler } from "react-hook-form";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

type FormFields = {
  name: string;
  email: string;
  password: string;
};
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const nav = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await registerUser({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      nav("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      setError("root", { message });
    }
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
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading" : "Submit"}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </Form>
  );
};

export default RegisterPage;
