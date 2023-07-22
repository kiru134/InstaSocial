import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignupModal from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import MainNavigation from "./pages/MainNavigation";
import Userprofile from "./pages/UserProfile";
import PrivateRoute from "./utlis/PrivateRoute";
import Dummy from "./pages/ignore.js/Dummy";
import SignUpMock from "./pages/ignore.js/signupmock";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          {/* <Route element={<Dummy />} path="/profile/:uid" /> */}
          {/* <Route element={<Homepage />} path="/Homepage" exact /> */}
        </Route>
        {/* <Route element={<SignupModal />} path="/signup" exact></Route> */}
        <Route element={<MainNavigation />} path="/"></Route>
        <Route element={<Dummy />} path="/profile/:username" />
        <Route element={<SignUpMock />} path="/signup" exact></Route>
        <Route element={<Homepage />} path="/Homepage" exact />
      </Routes>
    </Router>
  );
}

export default App;
