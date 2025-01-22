/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLogin } from "../../../hooks/api/useLogin";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, handleLogin, loading } =
    useLogin();

  const isButtonDisabled = !email || !password;

  return (
    <form onSubmit={handleLogin} css={loginWrapper}>
      <div>
        <div css={subTitle}>メールアドレス</div>
        <input
          css={inputWrapper}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
      </div>
      <div>
        <div css={subTitle}>パスワード</div>
        <input
          css={inputWrapper}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </div>
      <button
        type="submit"
        disabled={loading || isButtonDisabled}
        css={loginButton}
      >
        {loading ? "ログイン中" : "ログイン"}
      </button>
    </form>
  );
};

const loginWrapper = css`
  text-align: center;
`;
const subTitle = css`
  color: #3a3a3a;
  font-weight: bold;
`;
const inputWrapper = css`
  width: 300px;
  height: 34px;
  margin: 10px 0px;
`;
const loginButton = css`
  display: block;
  height: 50px;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  width: 200px;
  background-color: #8fbeee;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #7eacda;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;

export default LoginForm;
