import { useSelector } from "react-redux";
import Counter from "./components/Counter";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";

function App() {
  const isLoggedIn = useSelector((state) => state.authSlice.isLoggedIn);
  return (
    <>
      <Header />
      {isLoggedIn ? <UserProfile /> : <Auth />}
      <Counter />;
    </>
  );
}

export default App;
