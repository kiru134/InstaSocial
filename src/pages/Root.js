import { Outlet } from "react-router-dom";
import Homepage from "./Homepage";

function RootLayout() {
  //   const navigation = useNavigation();
  return (
    <>
      <Homepage />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default RootLayout;
