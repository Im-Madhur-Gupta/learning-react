import { Route, Link, useRouteMatch } from "react-router-dom";

const Welcome = () => {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  // path ko "path" prop of Route mai use karo
  // url ko "to" prop of Link tag mai use karo
  // console.log(path);
  // console.log(url);

  return (
    <section>
      <Link to={`${url}/new-user`}> New User </Link>
      <h1>Welcome</h1>
      <Route path={`${path}/new-user`}>
        <p>new-user</p>
      </Route>
    </section>
  );
};

export default Welcome;
