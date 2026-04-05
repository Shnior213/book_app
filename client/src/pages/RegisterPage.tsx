import { type UseFormSetError } from "react-hook-form";
import { registerUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthForm from "../components/AuthForm";
import type { AuthFormFields } from "../types/types";

const RegisterPage = () => {
  const nav = useNavigate();

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      nav("/");
    },
  });

  const handleRegister = (
    data: AuthFormFields,
    setError: UseFormSetError<AuthFormFields>,
  ) => {
    registerMutation(data, {
      onError: (error: Error) => {
        setError("root", {
          message: error.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <AuthForm
      title="Register"
      onSubmit={handleRegister}
      isPending={isPending}
    />
  );
};

export default RegisterPage;
