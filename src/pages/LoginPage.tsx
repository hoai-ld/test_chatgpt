import { FormEvent, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isSuccess = login({ username, password });

    if (!isSuccess) {
      setError("Sai tài khoản hoặc mật khẩu. Hãy dùng admin/admin.");
      return;
    }

    setError("");
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Đăng nhập WebGIS</h1>
        <p>Demo hiện dùng tài khoản cứng: admin / admin</p>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <div className="login-error">{error}</div>}

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
