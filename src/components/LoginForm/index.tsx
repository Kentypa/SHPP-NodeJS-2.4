import React, { useState } from "react";

export const LoginForm: React.FC = () => {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="wrapper login">
      <h3>Доступ к учетной записи</h3>
      <div className="LoginInput">
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type="text"
          placeholder="yaropolk@example.com"
          required
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="******"
          required
        />
      </div>
      <div className="LoginButton">
        <button
          onClick={() => {
            "@click=\"register\"";
          }}
        >
          Зарегистрироваться
        </button>
        <button
          onClick={() => {
            "@click=\"logIn\"";
          }}
          className="primary"
        >
          Войти
        </button>
      </div>
    </div>
  );
};
