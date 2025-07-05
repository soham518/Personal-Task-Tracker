import { useState } from "react";

const Login = ({ setUsername }) => {
  const [input, setInput] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    localStorage.setItem("username", input.trim());
    setUsername(input.trim());
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={input}
          required
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;