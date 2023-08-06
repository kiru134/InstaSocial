import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignupModal from "./pages/SignupPage";
import Homepage from "./pages/Homepage";
import MainNavigation from "./pages/MainNavigation";
import Userprofile from "./pages/UserProfile";
import PrivateRoute from "./utlis/PrivateRoute";
import Dummy from "./pages/ignore.js/Dummy";
import SignUpMock from "./pages/ignore.js/signupmock";
import PasswordReset from "./pages/passwordreset";
import UserprofileEdit from "./pages/userprofileedit";
import Userfollowers from "./Components/followersmodal";
import Userfollowings from "./Components/followingmodal";
import { useLocation } from "react-router-dom";
import Forgetpassword from "./pages/forgetpasswordpage";
import NotFound from "./pages/Errorpages/404notfoundpage";

function App() {
  const location = useLocation();
  const previousLocation = location.state?.previousLocation;
  console.log(location);
  return (
    <>
      <Routes location={previousLocation || location}>
        <Route element={<PrivateRoute />}>
          <Route element={<Dummy />} path="/profile/:username/"></Route>
          <Route element={<UserprofileEdit />} path="/profile/:username/edit" />

          <Route element={<Homepage />} path="/Homepage" exact />

          {/* <Route element={<Homepage />} path="/Homepage" exact /> */}
        </Route>
        {/* <Route element={<SignupModal />} path="/signup" exact></Route> */}
        <Route element={<MainNavigation />} path="/"></Route>
        <Route
          element={<PasswordReset />}
          path="/account/password/reset"
          exact
        ></Route>
        <Route element={<SignUpMock />} path="/signup" exact></Route>
        <Route
          element={<Forgetpassword />}
          path="/account/:username/resetpassword/"
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {previousLocation && (
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              element={<Userfollowings />}
              path="/profile/:username/following"
            ></Route>
            <Route
              element={<Userfollowers />}
              path="/profile/:username/followers"
            />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
