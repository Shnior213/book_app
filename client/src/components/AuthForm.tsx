import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import {
  useForm,
  type SubmitHandler,
  type UseFormSetError,
} from "react-hook-form";
// import type { AuthFormFields } from "../types/types";
import styled from "styled-components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

type Formfileds = z.infer<typeof formSchema>;

type PropesForm = {
  title: string;
  onSubmit: (data: Formfileds, setError: UseFormSetError<Formfileds>) => void;
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
  } = useForm<Formfileds>({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit: SubmitHandler<Formfileds> = (data) => {
    onSubmit(data, setError);
  };

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <h3>{title}</h3>

      {title === "Register" && (
        <Input {...register("name")} type="text" placeholder="Name" />
      )}

      <Input {...register("email")} type="email" placeholder="Email" />

      <Input {...register("password")} type="password" placeholder="Password" />

      <Button disabled={isPending} type="submit">
        {isPending ? "Loading..." : "Submit"}
      </Button>
      {errors.root && <StyledErrorDiv>{errors.root.message}</StyledErrorDiv>}
    </Form>
  );
};

export default AuthForm;
