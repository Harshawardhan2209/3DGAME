import { useState } from "react";

const User = ({ name, location }) => {
  const [count, setCount] = useState(0);
  const [countNew, setCountNew] = useState(0);

  return (
    <div>
      <h2>Developed By</h2>
      <h3>Name: {name}</h3>
      <h3>Location: {location}</h3>
      <h3>Contact: ajitpatare1@gmail.com</h3>
      <h3>Total Users: {count}</h3>
      <h3>Total Users in India: {countNew}</h3>
    </div>
  );
};

export default User;
