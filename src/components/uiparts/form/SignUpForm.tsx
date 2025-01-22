/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

type SignUpProps = {
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
};

export const SignUpForm: React.FC<SignUpProps> = ({
  handleSignUp,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const isButtonDisabled = !email || !password || !name || !confirmPassword;
  return (
    <form onSubmit={handleSignUp} css={signupWrapper}>
      <div css={subTitle}>ユーザーネーム</div>
      <input
        css={inputWrapper}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <div css={subTitle}>メールアドレス</div>
      <input
        css={inputWrapper}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <div css={subTitle}>パスワード</div>
      <input
        css={inputWrapper}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <div css={subTitle}>パスワード(再確認)</div>
      <input
        css={inputWrapper}
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button type="submit" css={signupButton} disabled={isButtonDisabled}>
        新規登録
      </button>
    </form>
  );
};

const subTitle = css`
  color: #3a3a3a;
  font-weight: bold;
`;
const signupWrapper = css`
  text-align: center;
`;
const inputWrapper = css`
  width: 300px;
  height: 34px;
  margin: 10px 0px;
`;
const signupButton = css`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  height: 50px;
  font-size: 16px;
  width: 200px;
  background-color: #91e699;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #75ba7b;
  }
  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
  }
`;
