import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import {
  useForm,
  type SubmitHandler,
  type UseFormSetError,
} from "react-hook-form";
import type { AuthFormFields } from "../types/types";
import styled from "styled-components";

type PropesForm = {
  title: string;
  onSubmit: (
    data: AuthFormFields,
    setError: UseFormSetError<AuthFormFields>,
  ) => void;
  isPending: boolean;
};

const StyledErrorDiv = styled.div`
  color: red;
  box-shadow: 0 2px 5px hsla(0, 0%, 0%, 0.1);
  font-size: 1rem;
`;

const AuthForm = ({ title, onSubmit, isPending }: PropesForm) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<AuthFormFields>();

  const handleFormSubmit: SubmitHandler<AuthFormFields> = (data) => {
    onSubmit(data, setError);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <h3>{title}</h3>

      {title === "Register" && (
        <Input
          {...register("name", {
            required: "name is required",
          })}
          type="text"
          placeholder="Name"
        />
      )}
      {errors.name && <StyledErrorDiv>{errors.name.message}</StyledErrorDiv>}
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
      {errors.email && <StyledErrorDiv>{errors.email.message}</StyledErrorDiv>}
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
      {errors.password && <StyledErrorDiv>{errors.password.message}</StyledErrorDiv>}
      <Button disabled={isPending} type="submit">
        {isPending ? "Loading..." : "Submit"}
      </Button>
      {errors.root && <StyledErrorDiv>{errors.root.message}</StyledErrorDiv>}
    </Form>
  );
};

export default AuthForm;
