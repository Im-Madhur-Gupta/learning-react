const DisplayUser = ({ users }) => {
  return users.map((user) => (
    <p key={user.id}>
      {user.username} ({user.age} years old)
    </p>
  ));
};

export default DisplayUser;
