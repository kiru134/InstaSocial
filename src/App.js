import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./pages/Root";
import SignupModal from "./Components/SignupModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
  },
  {
    path: "/signup",
    element: <SignupModal />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
