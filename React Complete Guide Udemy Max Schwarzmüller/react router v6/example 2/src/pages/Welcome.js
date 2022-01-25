import { Link, Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      {/* Nested path/url mai leading "/" ni ayega. */}
      <Link to="new-user">New User</Link>

      {/* v6 mai bhi aisa kar sakte ho nested routes ke liye but isse acha tareka hai, New way -> go to App.js. */}
      {/* <Routes>
        <Route path="new-user" element={<p>Welcome, new user!</p>} />
      </Routes> */}

      {/* part of the new syntax */}
      <Outlet />
    </section>
  );
};

export default Welcome;
