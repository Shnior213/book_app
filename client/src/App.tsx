import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddBook from "./pages/AddBook";
import BookPage from "./pages/BookPage";
import AddReview from "./pages/AddReview";
import { UserProvider } from "./context/useContext";
import MyBooks from "./pages/MyBooks";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/addbook",
            element: <AddBook />,
          },
          {
            path: "/bookpage",
            element: <BookPage />,
          },
          {
            path: "/addreview",
            element: <AddReview />,
          },
          {
            path: "/mybooks",
            element: <MyBooks />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
