import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBook from "./pages/AddBook";
import BookPage from "./pages/BookPage";
import AddReview from "./pages/AddReview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <MainLayout>
          <RegisterPage />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <MainLayout>
          <LoginPage />
        </MainLayout>
      ),
    },
    {
      path: "/addbook",
      element: (
        <MainLayout>
          <AddBook />
        </MainLayout>
      ),
    },
    {
      path: "/bookpage",
      element: (
        <MainLayout>
          <BookPage />
        </MainLayout>
      ),
    },
    {
      path: "/addreview",
      element: (
        <MainLayout>
          <AddReview />
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
