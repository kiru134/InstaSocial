import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import SignupModal from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import MainNavigation from "./pages/MainNavigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/signup",
    element: <SignupModal />,
  },
  {
    path: "/Homepage",
    element: <Homepage></Homepage>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
