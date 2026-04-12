import { type UseFormSetError } from "react-hook-form";
import { login } from "../services/auth.service";
import { useUserContext } from "../context/UseUserContext";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import AuthForm from "../components/AuthForm";
import type { AuthFormFields } from "../types/types";

const LoginPage = () => {
  const { setUser } = useUserContext();

  const nav = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (responseData) => {
      console.log(responseData);

      setUser({
        userId: responseData.user.id.toString(),
        isAdmin: responseData.user.isAdmin,
        username: responseData.user.name,
      });
      nav("/");
    },
  });

  const handleLogin = (
    data: AuthFormFields,
    setError: UseFormSetError<AuthFormFields>,
  ) => {
    loginMutation(data, {
      onError: (error: Error) => {
        setError("root", {
          message: error.message || "Something went wrong",
        });
      },
    });
  };

  return (
    <AuthForm title="Login" onSubmit={handleLogin} isPending={isPending} />
  );
};

export default LoginPage;
